package com.blog.payment.payments;

public enum PaymentStatus {
    SUCCESS("success"),
    FAILED("failed");

    private String status;

    public String getStatus() {
        return status;
    }

    private PaymentStatus(String status) {
        this.status = status;
    } 

}
