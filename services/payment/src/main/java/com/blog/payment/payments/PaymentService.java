package com.blog.payment.payments;

import java.time.LocalDateTime;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;


@RequiredArgsConstructor
@Service
public class PaymentService {
    private final PaymentRespository paymentRespository;

    public Boolean getSubscriptionStatus(String username) {
        Payment payment = paymentRespository.findByUsername(username)
        .orElseThrow(() -> new RuntimeException("User is not subscribed to any subscription"));
        return payment.getSubscriptionEndDate().isAfter(LocalDateTime.now());
    }

    
}
