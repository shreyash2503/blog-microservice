package com.blog.crud.blog;

import jakarta.validation.constraints.NotNull;

public record BlogRequest(
        @NotNull(message = "The title of the blog cannot be empty")
        String title,
        @NotNull(message = "The author of a blog cannot be empty")
        String author,
        String content,
        @NotNull(message = "A blog must have a category id")
        String categoryId
) {
}
