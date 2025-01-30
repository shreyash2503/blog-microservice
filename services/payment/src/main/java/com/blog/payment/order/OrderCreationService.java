package com.blog.payment.order;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;


@Service
public class OrderCreationService {
    @Value("${razorpay.key}")
    String keyId;

    @Value("${razopay.secret}")
    String secret;

    public Order createOrder(OrderCreationRequest orderCreationRequest) throws RazorpayException {
        RazorpayClient razorpayClient = new RazorpayClient("", "");
        JSONObject orderRequest = new JSONObject();
        orderRequest.put("currency", orderCreationRequest.currency());
        orderRequest.put("amount", orderCreationRequest.amount());
        orderRequest.put("receipt" , "receipt");
        return razorpayClient.orders.create(orderRequest);
    }

    
}
