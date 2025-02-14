package com.blog.payment.kafka;

import java.math.BigDecimal;

public record PaymentStatusConfirmation(
    String username,
    String description,
    BigDecimal paymentAmount,
    String paymentMethod
) {
    
}
