package com.blog.authentication.validate;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserValidResponse {
    private boolean valid;
    @JsonProperty("user_id")
    private String userId;
    private List<String> roles;
}
