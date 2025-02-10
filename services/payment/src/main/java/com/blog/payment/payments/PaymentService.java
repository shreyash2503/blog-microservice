package com.blog.payment.payments;

import java.time.LocalDate;
import java.time.LocalDateTime;

import org.springframework.stereotype.Service;

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

    public Boolean getSubscriptionStatus(String username) {
        Payment payment = paymentRepository.findTopByUsernameOrderByCreatedAtDesc(username)
        .orElseThrow(() -> new RuntimeException("User is not subscribed to any subscription"));
        return payment.getSubscriptionEndDate().isAfter(LocalDateTime.now());
    }

    public void savePayment(PaymentCaptureRequest paymentCaptureRequest) throws RazorpayException, JsonMappingException, JsonProcessingException {
      // Get the payment from the razorpay apis and get the corresponding username
        String keyId = "rzp_test_mWDvyDcw88pXSA";
        String keySecret = "bVERrwOIJwgxTDbXl4AugAJc";
        ObjectMapper objectMapper = new ObjectMapper();
        
        // Combine credentials in the format "keyId:keySecret"
        RazorpayClient razorpayClient = new RazorpayClient(keyId, keySecret);
        PaymentClient paymentClient = razorpayClient.payments;
        var paymentDetails = paymentClient.fetch(paymentCaptureRequest.getRazorpayPaymentId());

        JsonNode mainNode = objectMapper.readTree(paymentDetails.toString());

        String orderId = mainNode.get("order_id").asText();
        String paymentMethod = mainNode.get("method").asText();
        var payment = paymentRepository.findByOrderId(orderId)
            .orElseThrow(() -> new RuntimeException("Invalid payment")); 

        payment.setRazorpayPaymentId(paymentCaptureRequest.getRazorpayPaymentId());
        // Handle IllegalArgumentException here for paymentMethod
        payment.setPaymentMethod(PaymentMethod.fromSring(paymentMethod));
        payment.setPaymentStatus(PaymentStatus.SUCCESS);
        payment.setPaymentDetails(paymentDetails.toString());
        payment.setSubscriptionEndDate(LocalDateTime.now().plusMonths(6));
        paymentRepository.save(payment);
        // Send and email that the payment was successfull
    }

    
}
