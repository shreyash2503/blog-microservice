package com.blog.payment.order;

import org.json.JSONObject;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;


@Service
public class OrderCreationService {

      public String createOrderId(OrderCreationRequest orderCreationRequest, String username) throws RazorpayException, JsonMappingException, JsonProcessingException {
        RazorpayClient razorpayClient = new RazorpayClient("", "");
        JSONObject orderRequest = new JSONObject();
        orderRequest.put("currency", orderCreationRequest.currency());
        orderRequest.put("amount", orderCreationRequest.amount());
        orderRequest.put("receipt" , "receipt");
        Order order = razorpayClient.orders.create(orderRequest);
        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode node = objectMapper.readTree(order.toString());
        return node.get("id").asText();
    }

    
}
