package com.blog.crud.likes;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface LikesRepository extends JpaRepository<Like, Integer> {
    Optional<Like> findByUserIdAndBlog_Id(String userId, Integer id);
    long countLikesByLikeTypeAndBlog_Id(LikeType likeType, Integer blogId);
}
