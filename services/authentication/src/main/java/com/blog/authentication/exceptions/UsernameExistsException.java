package com.blog.authentication.exceptions;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
public class UsernameExistsException extends RuntimeException {
    private final String msg;
}
