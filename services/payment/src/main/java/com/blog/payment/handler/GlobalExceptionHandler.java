package com.blog.payment.handler;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.blog.payment.exceptions.PaymentNotValid;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(PaymentNotValid.class) 
    public ResponseEntity<String> handle(PaymentNotValid exp) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(exp.getMsg());

    }
}