package com.blog.crud.blog;

import com.blog.crud.category.Category;

public record BlogResponse(
        String id,
        String title,
        String author,
        String content,
        Category categoryId
) {
}
