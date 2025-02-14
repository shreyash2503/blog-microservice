package com.blog.notification.email;

import lombok.Getter;

public enum EmailTemplate {
    ACCOUNT_CREATION_SUCCESSFUL("authentication_successful.html", "Account created successfully"),
    PAYMENT_SUCCESSFULL("payment_successfull.html", "Payment done successfully");

   @Getter
    private final String template;
    @Getter
    private final String subject;

    EmailTemplate(String template, String subject) {
        this.template = template;
        this.subject = subject;
    }

}
