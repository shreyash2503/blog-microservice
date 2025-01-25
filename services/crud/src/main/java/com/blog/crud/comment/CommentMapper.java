package com.blog.crud.comment;

import com.blog.crud.blog.Blog;
import com.blog.crud.utils.Encryption;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class CommentMapper {
    private final Encryption encryptor;

    public Comment toComment(CommentRequest commentRequest, String username) {
        return Comment.builder()
                .userId(username)
                .parentComment(Comment.builder()
                        .Id(Integer.valueOf(commentRequest.getParentId()))
                        .build())
                .content(commentRequest.getContent())
                .blog(Blog.builder()
                        .id(encryptor.decodeId(commentRequest.getBlogId()))
                        .build())
                .build();
    }
}
