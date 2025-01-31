package com.blog.crud.blog;


public record BlogResponse(
        String id,
        String title,
        String author,
        String content,
        Integer categoryId
) {
}
