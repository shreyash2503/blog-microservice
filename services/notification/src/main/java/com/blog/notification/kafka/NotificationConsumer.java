package com.blog.notification.kafka;

import com.blog.notification.kafka.auth.AccountCreationConfirmation;
import com.blog.notification.email.EmailService;
import com.blog.notification.email.EmailTemplate;
import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
@Slf4j
public class NotificationConsumer {
    private final EmailService emailService;

    @KafkaListener(topics = "account-creation")
    public void consumeAccountCreationSuccessNotification(AccountCreationConfirmation accountCreationConfirmation) throws MessagingException {
        log.info(String.format("Consuming the message from account-creation topic:: %s", accountCreationConfirmation));
        Map<String, Object> map = new HashMap<>();
        map.put("username", accountCreationConfirmation.username());
        map.put("createdAt", accountCreationConfirmation.createdAt());
        map.put("firstname", accountCreationConfirmation.firstname());
        map.put("lastname", accountCreationConfirmation.lastname());
        emailService.sendEmail(accountCreationConfirmation.username(), map, EmailTemplate.ACCOUNT_CREATION_SUCCESSFUL);

    }
}
