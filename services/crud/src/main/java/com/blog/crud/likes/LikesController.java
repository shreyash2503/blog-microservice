package com.blog.crud.likes;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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

}
