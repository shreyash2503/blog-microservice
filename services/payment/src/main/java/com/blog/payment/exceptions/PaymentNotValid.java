package com.blog.payment.exceptions;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
public class PaymentNotValid extends RuntimeException {
    private final String msg;
}
