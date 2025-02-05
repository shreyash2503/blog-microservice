package com.blog.payment.payments;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.razorpay.RazorpayException;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/payments")
public class PaymentController {
    private final PaymentService paymentService;

    @GetMapping("/get-subscription-status")
    public ResponseEntity<Boolean> getSubscriptionStatus(HttpServletRequest request) {
        String username = (String) request.getAttribute("username");
        System.out.println(username);
        return ResponseEntity.ok(paymentService.getSubscriptionStatus(username));
    }

    @PostMapping(value = "/capture-payment")
    public ResponseEntity<Void> capturePayment(@RequestBody PaymentCaptureRequest paymentCaptureRequest) throws JsonMappingException, JsonProcessingException, RazorpayException {
        paymentService.savePayment(paymentCaptureRequest);
        return ResponseEntity.ok().build();
    }
    
}
