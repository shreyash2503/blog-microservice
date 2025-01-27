package com.blog.crud.comment;

import com.blog.crud.utils.Encryption;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;


@RequiredArgsConstructor
@Service
public class CommentService {
    private final CommentRepository commentRepository;
    private final CommentMapper commentMapper;
    private final Encryption encryptor;


    public void createComment(CommentRequest commentRequest, String username) {
        var comment = commentMapper.toComment(commentRequest, username);
        commentRepository.save(comment);
    }

    public List<CommentResponse> getComments(String blogId) {
        List<Comment> comments = commentRepository.findAllByBlog_Id(encryptor.decodeId(blogId));
        return comments.stream().map(commentMapper::toCommentResponse).toList();
    }

}

