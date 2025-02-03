package com.blog.payment.payments;

import org.springframework.cloud.openfeign.FeignClient;

@FeignClient(
    name = "razorpay-payments-client",
    url = "${razorpay-payment-url}"
)
public class RazorpayClient {
    // public String getPayment(@PathVariable("payment-id") String paymentId);

    
}
