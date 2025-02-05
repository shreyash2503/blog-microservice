package com.blog.payment.payments;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface PaymentRespository extends JpaRepository<Payment, Integer> {
    Optional<Payment> findByUsername(String username);
    Optional<Payment> findByOrderId(String orderId);
    
}
