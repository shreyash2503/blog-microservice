package com.blog.authentication.handler;

import com.blog.authentication.exceptions.UserNotFoundException;
import com.blog.authentication.exceptions.UsernameExistsException;

import io.jsonwebtoken.ExpiredJwtException;
import org.apache.coyote.Response;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import javax.naming.AuthenticationException;
import java.util.HashMap;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(UserNotFoundException.class)
    public ResponseEntity<String> handle(UserNotFoundException exp) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(exp.getMsg());
    }
    @ExceptionHandler(UsernameExistsException.class)
    public ResponseEntity<String> handle(UsernameExistsException exp) {
        return ResponseEntity.status(HttpStatus.CONFLICT).body(exp.getMsg());

    }

    @ExceptionHandler(AuthenticationException.class)
    public ResponseEntity<String> handle(AuthenticationException exp) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Authentication Failed: " + exp.getMessage());

    }

    @ExceptionHandler(ExpiredJwtException.class)
    public ResponseEntity<String> handle(ExpiredJwtException exp) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Authentication Failed:: " + exp.getMessage());
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorResponse> handle(MethodArgumentNotValidException exp) {
        var errors = new HashMap<String, String>();

        exp.getBindingResult().getAllErrors().forEach(error -> {
            var fieldName = ((FieldError) error).getField();
            var errorMessage = error.getDefaultMessage();
            errors.put(fieldName, errorMessage);
        });
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ErrorResponse(errors));
    }
}
