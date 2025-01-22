-- Add a new column "likes" to the 'blog' table
CREATE TABLE _like (
    id SERIAL PRIMARY KEY,
    like_type VARCHAR(50) NOT NULL,
    blog_id INTEGER NOT NULL,
    user_id VARCHAR(255) NOT NULL,
    CONSTRAINT fk_blog FOREIGN KEY (blog_id) REFERENCES blog(id) ON DELETE CASCADE
);
