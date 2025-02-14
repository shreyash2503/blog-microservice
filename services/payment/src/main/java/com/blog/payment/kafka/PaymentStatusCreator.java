package com.blog.payment.kafka;

import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.kafka.support.KafkaHeaders;
import org.springframework.messaging.Message;
import org.springframework.messaging.support.MessageBuilder;
import org.springframework.stereotype.Service;


import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class PaymentStatusCreator {

    private final KafkaTemplate<String, PaymentStatusConfirmation> kafkaTemplate;

    public void sendPaymentStatus(PaymentStatusConfirmation paymentStatusConfirmation) {
        log.info("Sending payment status confirmation {}", paymentStatusConfirmation);
        Message<PaymentStatusConfirmation> message = MessageBuilder
        .withPayload(paymentStatusConfirmation) 
        .setHeader(KafkaHeaders.TOPIC, "payment-status")
        .build();
        kafkaTemplate.send(message);
    }
    
}
