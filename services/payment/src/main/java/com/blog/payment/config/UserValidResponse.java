package com.blog.payment.config;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserValidResponse {
    private boolean valid;
    @JsonProperty("user_id")
    private String userId;
    private List<String> roles;
}
