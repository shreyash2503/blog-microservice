package com.blog.crud.likes;

import com.blog.crud.blog.Blog;
import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity(name = "_like")
public class Like {
    @Id
    private Integer Id;

    @Enumerated(EnumType.STRING)
    private LikeType likeType;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "blog_id")
    Blog blog;

    String userId;
}
