package com.blog.crud.exceptions;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
public class CategoryNotFoundException extends RuntimeException {
    private final String msg;
    
}
