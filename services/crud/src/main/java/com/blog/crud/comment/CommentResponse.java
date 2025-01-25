package com.blog.crud.comment;

import java.time.LocalDateTime;

public record CommentResponse(
        String blogId,
        String content,
        String parentId,
        LocalDateTime createdAt,
        LocalDateTime modifiedAt
) {
}
