package com.blog.payment.order;

import org.springframework.web.bind.annotation.RestController;

import com.blog.payment.payments.PaymentCaptureRequest;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.razorpay.Order;
import com.razorpay.RazorpayException;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.ws.rs.core.MediaType;
import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.GetMapping;



@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/payments")
@CrossOrigin(origins = "http://127.0.0.1:5500")
public class OrderCreationController {
    private final OrderCreationService orderCreationService;

    @PostMapping("/create-order")
    public ResponseEntity<OrderCreationResponse> createOrder(@RequestBody OrderCreationRequest OrderCreationRequest, HttpServletRequest request) throws RazorpayException, JsonMappingException, JsonProcessingException {
        String username = (String) request.getAttribute("username");
        String order = orderCreationService.createOrderId(OrderCreationRequest, username);
        return ResponseEntity.ok(new OrderCreationResponse(order));
    }


}