package com.blog.crud.likes;

import org.springframework.data.jpa.repository.JpaRepository;

public interface LikesRepository extends JpaRepository<Like, Integer> {
}
