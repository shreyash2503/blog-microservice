package com.blog.authentication.validate;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/auth")
public class ValidateTokenController {

    @PostMapping("/validate-token")
    public ResponseEntity<UserValidResponse> validateUser() {
        var authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication != null && authentication.isAuthenticated()) {
            Object principal = authentication.getPrincipal();
            if (principal instanceof UserDetails) {
                var user = (UserDetails) principal;
                return ResponseEntity.ok(UserValidResponse.builder()
                                .valid(true)
                                .userId(user.getUsername())
                                .roles(user.getAuthorities()
                                        .stream()
                                        .map(grantedAuthority -> grantedAuthority.getAuthority())
                                        .toList())
                        .build());
            } else {
                return ResponseEntity.ok(UserValidResponse.builder()
                                .userId((String) principal)
                                .build());
            }
        }

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(UserValidResponse.builder()
                        .valid(false)
                        .build());

    }
}
