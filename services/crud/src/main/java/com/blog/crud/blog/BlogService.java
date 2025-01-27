package com.blog.crud.blog;

import com.blog.crud.category.Category;
import com.blog.crud.category.CategoryRepository;
import com.blog.crud.constants.Constants;
import com.blog.crud.exceptions.BlogNotFoundException;
import com.blog.crud.exceptions.CategoryNotFoundException;
import com.blog.crud.exceptions.UnauthorizedException;
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
                .orElseThrow(() -> new BlogNotFoundException(Constants.BLOG_DOES_NOT_EXISTS));
        return blogMapper.toBlogResponse(blog);
    }

    public String createBlog(BlogRequest blogRequest) {
        var category = categoryRepository.findById(Integer.valueOf(blogRequest.categoryId()))
                .orElseThrow(() -> new CategoryNotFoundException(Constants.CATEGORY_DOES_NOT_EXISTS));
        var blog = blogRepository.save(blogMapper.toBlog(blogRequest, category));
        return encryptor.encodeId(blog.getId());
    }

    public void updateBlog(BlogRequest blogRequest, String username) {
        var category = categoryRepository.findById(Integer.valueOf(blogRequest.categoryId()))
                .orElseThrow(() -> new CategoryNotFoundException(Constants.CATEGORY_DOES_NOT_EXISTS));
        var blog = blogRepository.findById(encryptor.decodeId(blogRequest.id()))
                .orElseThrow(() -> new BlogNotFoundException(Constants.BLOG_DOES_NOT_EXISTS));
        //! Check if the user that has written the blog is updating the same 
        validateOwnership(blog, username);
        mergeBlog(blog, blogRequest);
        blogRepository.save(blog);
    }

    public void deleteBlog(String encodedId) {
        var id = encryptor.decodeId(encodedId);
        var blog = blogRepository.findById(id)
                .orElseThrow(() -> new BlogNotFoundException(Constants.BLOG_DOES_NOT_EXISTS));
        blogRepository.delete(blog);
    }

    private void validateOwnership(Blog blog, String username) {
        if (!blog.getAuthor().equals(username)) {
            throw new UnauthorizedException(Constants.UNAUTHORIZED);
        }

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
