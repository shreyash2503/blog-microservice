package com.blog.notification.kafka.auth;

import java.time.LocalDateTime;

public record AccountCreationConfirmation (
        String username,
        LocalDateTime createdAt,
        String firstname,
        String lastname
) {

}
