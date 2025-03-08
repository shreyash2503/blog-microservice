// package com.blog.crud.payments;

// import org.springframework.cloud.openfeign.FeignClient;
// import org.springframework.web.bind.annotation.PostMapping;
// import org.springframework.web.bind.annotation.RequestHeader;

// @FeignClient(
//     url = "${payment.url}",
//     name = "get-subscription-status"
// )
// public interface PaymentClient {
//     @PostMapping("/get-subscription-status")
//     Boolean getPaymentStatus(@RequestHeader("token") String authenticationToken);
    
// }
