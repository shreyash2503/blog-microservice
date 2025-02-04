package com.blog.payment.order;


import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PaymentCaptureRequest {
    @JsonProperty("razorpay_payment_id")
    private String razorpayPaymentId;
    @JsonProperty("razorpay_order_id")
    private String razorpayOrderId;
    @JsonProperty("razorpay_signature")
    private String razorpaySignature;
    
}
