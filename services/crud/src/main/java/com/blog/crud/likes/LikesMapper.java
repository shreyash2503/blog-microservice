package com.blog.crud.likes;

import com.blog.crud.blog.Blog;
import com.blog.crud.utils.Encryption;
import lombok.RequiredArgsConstructor;
import com.blog.crud.category.Category;


import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class LikesMapper {
    private final Encryption encryptor;

    public Like toLike(LikesRequest likeRequest, LikeType likeType) {
        return Like.builder()
                .userId(likeRequest.userId())
                .blog(Blog.builder()
                        .id(encryptor.decodeId(likeRequest.blogId()))
                        .build())
                .likeType(likeType)
                .category(Category.builder().id(likeRequest.categoryId()).build())
                .build();

    }

    public LikesResponse toLikesResponse(long totalLikes) {
        return new LikesResponse(totalLikes);

    }
}
