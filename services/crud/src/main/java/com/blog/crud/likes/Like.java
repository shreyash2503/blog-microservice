package com.blog.crud.likes;

import com.blog.crud.blog.Blog;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity(name = "_like")
public class Like {
    @Id
    private Integer Id;

    @Enumerated(EnumType.STRING)
    private LikeType likeType;

    @OneToOne
    @JoinColumn(name = "blog_id")
    Blog blog;

    String userId;
}
