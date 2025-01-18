package com.blog.crud.config;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;

import java.util.Optional;

@FeignClient(
        name = "validate-token",
        url = "${application.config.auth-url}"
)
public interface TokenClient {
    @GetMapping("/auth/validate-token")
    Optional<UserValidResponse> validateToken(@RequestHeader("Authorization") String authToken);
}
