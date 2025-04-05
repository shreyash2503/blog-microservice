package com.blog.authentication.user;

import org.springframework.stereotype.Service;

@Service
public class UserMapper {
    public UserResponse toUserResponse(User user) {
        return new UserResponse(
                user.getEmail(),
                user.getFirstname(),
                user.getLastname()
        );
    }

}
