package com.blog.crud.comment;

import com.blog.crud.blog.BlogService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/comments")
public class CommentController {
    private final CommentService commentService;

    @PostMapping
    public ResponseEntity<Void> createComment(@RequestBody CommentRequest commentRequest, HttpServletRequest request) {
        String username = (String) request.getAttribute("username");
        commentService.createComment(commentRequest, username);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/{blogId}")
    public ResponseEntity<List<CommentResponse>> getComments(@PathVariable("blogId") String blogId) {
        return ResponseEntity.ok(commentService.getComments(blogId));
    }

}
