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
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "like_seq")
    @SequenceGenerator(name = "like_seq", sequenceName = "like_sequence", allocationSize = 50)
    private Integer Id;

    @Enumerated(EnumType.STRING)
    private LikeType likeType;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "blog_id")
    private Blog blog;

    private String userId;
}
