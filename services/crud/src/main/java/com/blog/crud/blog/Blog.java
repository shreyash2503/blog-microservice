package com.blog.crud.blog;

import com.blog.crud.category.Category;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Blog {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "blog_seq")
    @SequenceGenerator(name = "product_seq", sequenceName = "blog_sequence", allocationSize = 50)
    private Integer id;

    @Column(nullable = false, length = 100)
    private String title;

    private String author;

    @Lob
    @Column(nullable = false)
    private String content;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;

    @CreatedDate
    private LocalDateTime createdAt;

    @LastModifiedDate
    private LocalDateTime lastModifiedAt;
}
