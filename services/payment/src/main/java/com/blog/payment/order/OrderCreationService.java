package com.blog.payment.order;

import org.json.JSONObject;
import org.springframework.stereotype.Service;

import com.blog.payment.payments.Payment;
import com.blog.payment.payments.PaymentRespository;
import com.blog.payment.payments.PaymentStatus;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;
import java.math.BigDecimal;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class OrderCreationService {
      private final PaymentRespository paymentRepository;

      public String createOrderId(OrderCreationRequest orderCreationRequest, String username) throws RazorpayException, JsonMappingException, JsonProcessingException {
        RazorpayClient razorpayClient = new RazorpayClient("rzp_test_mWDvyDcw88pXSA", "bVERrwOIJwgxTDbXl4AugAJc");
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
        .paymentStatus(PaymentStatus.PENDING)
        .orderId(orderId)
        .build();
        paymentRepository.save(payment);
        return orderId;

    }

    


    


    
}
