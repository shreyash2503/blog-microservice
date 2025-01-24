package com.blog.crud.likes;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/blogs/likes")
public class LikesController {
    private final LikesService likesService;

    @PostMapping("/increment")
    public ResponseEntity<Void> incrementLikes(@RequestBody LikesRequest likesRequest) {
        likesService.updateLikes(likesRequest, LikeType.LIKE);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/decrement")
    public ResponseEntity<Void> decrementLike(@RequestBody LikesRequest likesRequest) {
        likesService.updateLikes(likesRequest, LikeType.DISLIKE);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/positive/{blogId}")
    public ResponseEntity<LikesResponse> getLikes(@PathVariable("blogId") String blogId) {
        return ResponseEntity.ok(likesService.getLikes(blogId, LikeType.LIKE));
    }

    @GetMapping("/negative/{blogId}")
    public ResponseEntity<LikesResponse> getDisLikes(@PathVariable("blogId") String blogId) {
        return ResponseEntity.ok(likesService.getLikes(blogId, LikeType.DISLIKE));

    }

    @GetMapping("/user")
    public ResponseEntity<List<UserLikesResponse>> getUserLikedBlog(HttpServletRequest request) {
        String username = (String) request.getAttribute("username");
        System.out.println(username);
        return ResponseEntity.ok(likesService.getUserLikedBlogs(username));
    }

}
