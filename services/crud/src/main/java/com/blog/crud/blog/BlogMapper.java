package com.blog.crud.blog;

import com.blog.crud.category.Category;
import org.springframework.stereotype.Service;

@Service
public class BlogMapper {
    public Blog toBlog(BlogRequest blogRequest, Category category) {
        return Blog.builder()
                .author(blogRequest.author())
                .title(blogRequest.title())
                .content(blogRequest.content())
                .category(category)
                .build();
    }
}
