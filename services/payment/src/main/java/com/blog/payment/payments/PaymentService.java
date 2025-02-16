package com.blog.payment.payments;

import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.blog.payment.exceptions.PaymentNotValid;
import com.blog.payment.kafka.PaymentStatusConfirmation;
import com.blog.payment.kafka.PaymentStatusCreator;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.razorpay.PaymentClient;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;

import lombok.RequiredArgsConstructor;


@RequiredArgsConstructor
@Service
public class PaymentService {
    private final PaymentRespository paymentRepository;
    private final PaymentStatusCreator paymentStatusCreator;

    @Value("${razorpay.keyId}")
    private String keyId;

    @Value("${razorpay.secretKey}")
    private String secretKey;

    public Boolean getSubscriptionStatus(String username) {
        Payment payment = paymentRepository.findTopByUsernameOrderByCreatedAtDesc(username)
        .orElse(null);
        return payment == null ? false : payment.getSubscriptionEndDate().isAfter(LocalDateTime.now());
    }

    public void savePayment(PaymentCaptureRequest paymentCaptureRequest) throws RazorpayException, JsonMappingException, JsonProcessingException {
      // Get the payment from the razorpay apis and get the corresponding username
        ObjectMapper objectMapper = new ObjectMapper();
        
        // Combine credentials in the format "keyId:keySecret"
        RazorpayClient razorpayClient = new RazorpayClient(keyId, secretKey);
        PaymentClient paymentClient = razorpayClient.payments;
        var paymentDetails = paymentClient.fetch(paymentCaptureRequest.getRazorpayPaymentId());

        JsonNode mainNode = objectMapper.readTree(paymentDetails.toString());

        String orderId = mainNode.get("order_id").asText();
        String paymentMethod = mainNode.get("method").asText();
        var payment = paymentRepository.findByOrderId(orderId)
            .orElseThrow(() -> new PaymentNotValid("The payment is no longer valid")); 

        payment.setRazorpayPaymentId(paymentCaptureRequest.getRazorpayPaymentId());
        // Handle IllegalArgumentException here for paymentMethod
        payment.setPaymentMethod(PaymentMethod.fromSring(paymentMethod));
        payment.setPaymentStatus(PaymentStatus.SUCCESS);
        payment.setPaymentDetails(paymentDetails.toString());
        payment.setSubscriptionEndDate(LocalDateTime.now().plusMonths(6));
        paymentRepository.save(payment);
        // Send and email that the payment was successfull
        PaymentStatusConfirmation paymentStatusConfirmation = new PaymentStatusConfirmation(payment.getUsername(), "", payment.getPaymentAmount(), payment.getPaymentMethod().name());
        paymentStatusCreator.sendPaymentStatus(paymentStatusConfirmation);
    }

    
}
