package com.blog.authentication.auth;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.Length;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RegisterRequest {
    private Integer id;
    @NotNull(message = "First name is required")
    private String firstname;
    @NotNull(message = "Last name is required")
    private String lastname;
    @NotNull(message = "Email is required")
    @Email(message = "Not a valid email address")
    private String email;
    @NotNull(message = "Password is required")
    @Length(min = 8, message = "Password too short")
    private String password;
}
