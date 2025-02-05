package com.blog.payment.payments;

public enum PaymentMethod {
    CARD,
    UPI;

    public static PaymentMethod fromSring(String text) throws IllegalArgumentException {
        return PaymentMethod.valueOf(text.toUpperCase());
    }
    
}
