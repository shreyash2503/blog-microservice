package com.blog.authentication.validate;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/auth")
public class ValidateTokenController {
    private final ValidateTokenService validTokenService;

    @GetMapping("/validate-token")
    public ResponseEntity<UserValidResponse> validateUser() {
        return ResponseEntity.ok(validTokenService.validateToken());
    }
}
