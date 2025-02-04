package com.blog.payment.payments;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
        return ResponseEntity.ok(paymentService.getSubscriptionStatus(username));
    }
    
}
