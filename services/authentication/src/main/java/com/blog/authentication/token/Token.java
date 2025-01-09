package com.blog.authentication.token;

import com.blog.authentication.user.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document
public class Token {
    @Id
    public String Id;

    @Indexed(unique = true)
    public String token;

    public TokenType tokenType;

    public boolean revoked;

    public boolean expired;

    @DBRef
    public User user;
}
