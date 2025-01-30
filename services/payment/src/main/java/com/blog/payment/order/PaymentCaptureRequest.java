package com.blog.payment.order;


import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PaymentCaptureRequest {
    private String razorpayPaymentId;
    private String razorpayOrderId;
    private String razorpaySignature;
    
}
