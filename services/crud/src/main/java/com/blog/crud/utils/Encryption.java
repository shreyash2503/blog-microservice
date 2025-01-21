package com.blog.crud.utils;

import org.springframework.stereotype.Component;

import java.util.Base64;

@Component
public class Encryption {
    public String encodeId(Integer id) {
        return Base64.getUrlEncoder().encodeToString(String.valueOf(id).getBytes());
    }

    public int decodeId(String encodedId) {
        return Integer.parseInt(new String(Base64.getUrlDecoder().decode(encodedId)));

    }
}
