package com.blog.payment.order;

import org.springframework.web.bind.annotation.RestController;

import com.razorpay.Order;
import com.razorpay.RazorpayException;

import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;


@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/payments")
public class OrderCreationController {
    private final OrderCreationService orderCreationService;

    @PostMapping("/create-order")
    public ResponseEntity<OrderCreationResponse> createOrder(@RequestBody OrderCreationRequest OrderCreationRequest) throws RazorpayException {
        Order order = orderCreationService.createOrder(OrderCreationRequest);
        return ResponseEntity.ok(new OrderCreationResponse(order.toString()));
    }

    @PostMapping("/capture-payment")
    public String postMethodName(@RequestBody String entity) {
        

        
        return entity;
    }
    
    

}