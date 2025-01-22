package com.blog.crud.blog;

import com.blog.crud.category.Category;
import com.blog.crud.category.CategoryRepository;
import com.blog.crud.utils.Encryption;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang.StringUtils;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class BlogService {
    private final BlogMapper blogMapper;
    private final CategoryRepository categoryRepository;
    private final BlogRepository blogRepository;
    private final Encryption encryptor;

    public BlogResponse getBlog(String encodedId) {
        var id = encryptor.decodeId(encodedId);
        var blog = blogRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Blog does not exists")) ;
        return blogMapper.toBlogResponse(blog);
    }

    public String createBlog(BlogRequest blogRequest) {
        var category = categoryRepository.findById(Integer.valueOf(blogRequest.categoryId()))
                .orElseThrow(() -> new RuntimeException("Category does not exist"));
        var blog = blogRepository.save(blogMapper.toBlog(blogRequest, category));
        return encryptor.encodeId(blog.getId());
    }

    public void updateBlog(BlogRequest blogRequest) {
        var category = categoryRepository.findById(Integer.valueOf(blogRequest.categoryId()))
                .orElseThrow(() -> new RuntimeException("Category does not exists"));
        var blog = blogRepository.findById(encryptor.decodeId(blogRequest.id()))
                .orElseThrow(() -> new RuntimeException("Blog does not exist"));
        mergeBlog(blog, blogRequest);
        blogRepository.save(blog);
    }

    public void deleteBlog(String encodedId) {
        var id = encryptor.decodeId(encodedId);
        var blog = blogRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Blog does not exist"));
        blogRepository.delete(blog);
    }

    private void mergeBlog(Blog blog, BlogRequest blogRequest) {
        if (!StringUtils.isBlank(blogRequest.author())) {
            blog.setAuthor(blogRequest.author());
        }

        if (!StringUtils.isBlank(blogRequest.title())) {
            blog.setTitle(blogRequest.title());
        }

        if (!StringUtils.isBlank(blogRequest.content())) {
            blog.setContent(blogRequest.content());
        }

        if (!StringUtils.isBlank(blogRequest.categoryId())) {
            blog.setCategory(Category.builder()
                            .id(Integer.valueOf(blogRequest.categoryId()))
                    .build());
        }


    }

}
