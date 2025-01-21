package com.blog.crud.blog;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/blogs")
public class BlogController {
    private final BlogService blogService;

    @GetMapping("/{id}")
    public ResponseEntity<BlogResponse> getBlog(@PathVariable("id") String id) {
        return ResponseEntity.ok(blogService.getBlog(id));
    }




    @PostMapping
    public ResponseEntity<String> createBlog(@RequestBody BlogRequest blogRequest) {
        return ResponseEntity.ok(blogService.createBlog(blogRequest));
    }

    @PutMapping
    public ResponseEntity<Void> updateBlog(@RequestBody BlogRequest blogRequest) {
        if (blogRequest.id() == null) {
            return  ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
        blogService.updateBlog(blogRequest);
        return ResponseEntity.accepted().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBlog(@PathVariable("id") String id) {
        if (id == null) {
           return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
        blogService.deleteBlog(id);
        return ResponseEntity.accepted().build();
    }


}
