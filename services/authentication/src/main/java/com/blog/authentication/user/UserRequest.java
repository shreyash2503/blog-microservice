package com.blog.authentication.user;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record UserRequest(
    String firstname,
    String lastname,
    @NotBlank(message = "Email cannot be blank")
    @Email(message = "Not a valid email")
    String email,
    String imageUrl
) {
    
}
