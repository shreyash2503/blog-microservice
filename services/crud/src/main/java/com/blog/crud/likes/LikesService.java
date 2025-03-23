package com.blog.crud.likes;

import com.blog.crud.blog.BlogRepository;
import com.blog.crud.blog.BlogResponse;
import com.blog.crud.utils.Encryption;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class LikesService {
    private final Encryption encryptor;
    private final BlogRepository blogRepository;
    private final LikesRepository likesRepository;
    private final LikesMapper likesMapper;

    public void updateLikes(LikesRequest likesRequest, LikeType likeType) {
        // TODO: Instead of passing the userId and categoryId to the likesRequest figure it out from the blog
        var blogId = likesRequest.blogId();
        System.out.println(blogId);
        var blog = blogRepository
                .findById(encryptor.decodeId(blogId))
                .orElseThrow(() -> new RuntimeException("Blog does not exists"));
        // TODO: Handle the above exception in the global exception handler
        var like = likesRepository.findByUserIdAndBlog_Id(likesRequest.userId(), blog.getId());
        if (like.isPresent()) {
            Like existingLike = like.get();
            existingLike.setLikeType(likeType);
            likesRepository.save(existingLike);
        } else {
            var newLike = likesMapper.toLike(likesRequest, likeType);
            likesRepository.save(newLike);
        }
    }

    public Boolean isLiked(String blogId, String userId) {
        var blog = likesRepository.findByUserIdAndBlog_Id(userId, encryptor.decodeId(blogId));
        return blog.isPresent();
    }

    public LikesResponse getLikes(String blogId, LikeType likeType) {
        long count = likesRepository.countLikesByLikeTypeAndBlog_Id(likeType, encryptor.decodeId(blogId));
        return likesMapper.toLikesResponse(count);
    }

    public List<UserLikesResponse> getUserLikedBlogs(String userId) {
        List<Like> list = likesRepository.findAllByLikeTypeAndUserIdOrderByCreatedAtDesc(LikeType.LIKE, userId);
        return list
                .stream()
                .map(like -> {
                    var blog = like.getBlog();
                    return new UserLikesResponse(encryptor.encodeId(blog.getId()),
                            blog.getTitle(),
                            blog.getCategory().getName(),
                            null);
                }).toList();
    }

}
