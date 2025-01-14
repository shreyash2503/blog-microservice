package com.blog.authentication.kafka;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.kafka.support.KafkaHeaders;
import org.springframework.messaging.Message;
import org.springframework.messaging.support.MessageBuilder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class AccountCreationConfirmationCreator {
    private final KafkaTemplate<String, AccountCreationConfirmation> kafkaTemplate;

    public void sendAccountCreationConfirmation(AccountCreationConfirmation accountCreationConfirmation) {
        log.info("Sending account creation confirmation: {}", accountCreationConfirmation);
        Message<AccountCreationConfirmation> message = MessageBuilder
                .withPayload(accountCreationConfirmation)
                .setHeader(KafkaHeaders.TOPIC, "account-creation")
                .build();
        kafkaTemplate.send(message);

    }
}
