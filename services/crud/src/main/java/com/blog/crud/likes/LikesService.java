package com.blog.crud.likes;

import com.blog.crud.blog.BlogRepository;
import com.blog.crud.blog.BlogResponse;
import com.blog.crud.utils.Encryption;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class LikesService {
    private final Encryption encryptor;
    private final BlogRepository blogRepository;
    private final LikesRepository likesRepository;
    private final LikesMapper likesMapper;

    public void updateLikes(LikesRequest likesRequest, LikeType likeType) {
        var blogId = likesRequest.blogId();
        var blog = blogRepository
                .findById(encryptor.decodeId(blogId))
                .orElseThrow(() -> new RuntimeException("Blog does not exists"));
        var like = likesRepository.findByUserIdAndBlog(likesRequest.userId(), blog);
        if (like.isPresent()) {
            Like existingLike = like.get();
            existingLike.setLikeType(likeType);
            likesRepository.save(existingLike);
        } else {
            var newLike = likesMapper.toLike(likesRequest, likeType);
            likesRepository.save(newLike);
        }
    }

}
