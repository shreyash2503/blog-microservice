CREATE SEQUENCE IF NOT EXISTS comment_sequence START 1 INCREMENT 50;

CREATE TABLE comment
(
    id               INTEGER PRIMARY KEY DEFAULT nextval('comment_sequence'),
    user_id          VARCHAR(255) NOT NULL,
    blog_id          INTEGER      NOT NULL,
    parent_id        INTEGER,
    content          TEXT         NOT NULL,
    created_at       TIMESTAMP           DEFAULT CURRENT_TIMESTAMP,
    last_modified_at TIMESTAMP
)
