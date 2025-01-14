package com.blog.authentication.kafka;

import java.time.LocalDateTime;

public record AccountCreationConfirmation (
       String username,
       LocalDateTime createdAt,
       String firstname,
       String lastname
) {

}
