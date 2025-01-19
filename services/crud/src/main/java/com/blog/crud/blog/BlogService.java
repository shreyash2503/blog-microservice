package com.blog.crud.blog;

import com.blog.crud.category.Category;
import com.blog.crud.category.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class BlogService {
    private final BlogMapper blogMapper;
    private final CategoryRepository categoryRepository;
    private final BlogRepository blogRepository;

    public Integer createBlog(BlogRequest blogRequest) {
        var category = categoryRepository.findById(Integer.valueOf(blogRequest.categoryId()))
                .orElseThrow(() -> new RuntimeException("Category does not exist"));
        var blog = blogRepository.save(blogMapper.toBlog(blogRequest, category));
        return blog.getId();
    }

}
