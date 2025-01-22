package com.blog.crud.likes;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/blogs/likes")
public class LikesController {

    @PostMapping("/increment")
    public ResponseEntity<Void> incrementLikes(@RequestBody LikesRequest likesBody) {


    }


}
