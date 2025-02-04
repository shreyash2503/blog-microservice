package com.blog.payment.order;

import org.json.JSONObject;
import org.springframework.stereotype.Service;

import com.blog.payment.payments.Payment;
import com.blog.payment.payments.PaymentRespository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.razorpay.Order;
import com.razorpay.PaymentClient;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;
import java.math.BigDecimal;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class OrderCreationService {
      private final PaymentRespository paymentRepository;

      public String createOrderId(OrderCreationRequest orderCreationRequest, String username) throws RazorpayException, JsonMappingException, JsonProcessingException {
        RazorpayClient razorpayClient = new RazorpayClient("", "");
        JSONObject orderRequest = new JSONObject();
        orderRequest.put("currency", orderCreationRequest.currency());
        orderRequest.put("amount", orderCreationRequest.amount());
        orderRequest.put("receipt" , "receipt");
        Order order = razorpayClient.orders.create(orderRequest);
        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode node = objectMapper.readTree(order.toString());
        //! Save the order_id to the database to retrieve later
        String orderId = node.get("id").asText();
        Payment payment = Payment.builder()
        .username(username)
        .paymentAmount(BigDecimal.valueOf(orderCreationRequest.amount() / 100))
        .orderId(orderId)
        .build();
        paymentRepository.save(payment);
        return orderId;

    }

    


    public String savePayment() throws RazorpayException {
      // Get the payment from the razorpay apis and get the corresponding username
      String keyId = "";
      String keySecret = "";
        
        // Combine credentials in the format "keyId:keySecret"
      RazorpayClient razorpayClient = new RazorpayClient(keyId, keySecret);
      PaymentClient paymentClient = razorpayClient.payments;
      var  payment = paymentClient.fetch("pay_PrhtodVu3c1qqi");
      System.out.println(payment.toString());
      return payment.toString();

      // Payment payment = paymentRepository.findByUsername(username)
      // .orElseThrow(() -> new RuntimeException("Unable to find the corresponding payment, please try again"));

      // payment.setRazorpayPaymentId(razorpayPaymentId);
      // payment.setPaymentMethod(PaymentMethod.UPI);
      // payment.setPaymentStatus(PaymentStatus.SUCCESS);
      // payment.setPaymentDetails(paymentDetails);
      // // payment.setSubscriptionEndDate();
      // paymentRepository.save(payment);
      // Kafka Notify the user the payment status if successfull or not successfull

    }


    
}
