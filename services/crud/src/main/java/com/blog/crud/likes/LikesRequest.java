package com.blog.crud.likes;

public record LikesRequest(
        String blogId,
        String userId
) {
}
