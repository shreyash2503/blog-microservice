package com.blog.crud.blog;

import com.blog.crud.category.Category;
import com.blog.crud.utils.Encryption;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class BlogMapper {
    private final Encryption encryptor;
    public Blog toBlog(BlogRequest blogRequest, Category category) {
        return Blog.builder()
                .author(blogRequest.author())
                .title(blogRequest.title())
                .content(blogRequest.content())
                .category(category)
                .build();
    }
    public BlogResponse toBlogResponse(Blog blog) {
        return new BlogResponse(
                encryptor.encodeId(blog.getId()),
                blog.getTitle(),
                blog.getAuthor(),
                blog.getContent(),
                blog.getCategory().getId()
        );

    }
}
