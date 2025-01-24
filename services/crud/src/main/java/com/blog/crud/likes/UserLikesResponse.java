package com.blog.crud.likes;

public record UserLikesResponse(
        String blogId,
        String blogTitle,
        String blogCategory,
        String blogDescription
) {
}
