package com.blog.crud.likes;

import com.blog.crud.blog.Blog;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface LikesRepository extends JpaRepository<Like, Integer> {
    Optional<Like> findByUserIdAndBlog(String userId, Blog blog);
}
