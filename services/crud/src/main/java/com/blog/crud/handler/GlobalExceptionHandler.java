package com.blog.crud.handler;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.blog.crud.exceptions.BlogNotFoundException;
import com.blog.crud.exceptions.CategoryNotFoundException;
import com.blog.crud.exceptions.UnauthorizedException;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(BlogNotFoundException.class)
    public ResponseEntity<String> handle(BlogNotFoundException exp) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(exp.getMsg());
    }

    @ExceptionHandler(CategoryNotFoundException.class)
    public ResponseEntity<String> handle(CategoryNotFoundException exp) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(exp.getMsg());

    }

    @ExceptionHandler(UnauthorizedException.class) 
    public ResponseEntity<String> handle(UnauthorizedException exp) {
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body(exp.getMsg());

    } 

}


