package com.blog.notification.kafka.payment;

import java.math.BigDecimal;

public record PaymentStatusConfirmation(
    String username,
    String description,
    BigDecimal paymentAmount,
    String paymentMethod
) {
    
}

