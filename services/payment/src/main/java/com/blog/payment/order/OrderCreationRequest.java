package com.blog.payment.order;

public record OrderCreationRequest(
    Integer amount,
    String currency,
    String username

) {


}
