package com.blog.authentication.user;

public record UserResponse(
        String username,
        String firstname,
        String lastname,
        String imageUrl
) {
}
