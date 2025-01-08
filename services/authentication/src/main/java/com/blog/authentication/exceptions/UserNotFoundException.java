package com.blog.authentication.exceptions;

import lombok.Data;
import lombok.EqualsAndHashCode;


@Data
@EqualsAndHashCode(callSuper = true)
public class UserNotFoundException extends RuntimeException {
    private final String msg;
}
