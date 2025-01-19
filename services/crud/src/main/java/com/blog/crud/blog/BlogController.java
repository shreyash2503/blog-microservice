package com.blog.crud.blog;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/blogs")
public class BlogController {
    private final BlogService blogService;

    @PostMapping
    public ResponseEntity<Integer> createBlog(@RequestBody BlogRequest blogRequest) {
        return ResponseEntity.ok(blogService.createBlog(blogRequest));

    }


}
