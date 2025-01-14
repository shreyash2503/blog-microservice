package com.blog.authentication.validate;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ValidateTokenService {

    public UserValidResponse validateToken() {
        var authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication != null && authentication.isAuthenticated()) {
            Object principal = authentication.getPrincipal();
            if (principal instanceof UserDetails) {
                var user = (UserDetails) principal;
                return UserValidResponse.builder()
                        .valid(true)
                        .userId(user.getUsername())
                        .roles(user.getAuthorities()
                                .stream()
                                .map(grantedAuthority -> grantedAuthority.getAuthority())
                                .toList())
                        .build();
            } else {
                return UserValidResponse.builder()
                        .userId((String) principal)
                        .build();
            }
        }
        return UserValidResponse.builder()
                .valid(false)
                .build();
    }

}
