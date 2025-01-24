ALTER TABLE _like
    ADD COLUMN created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE _like
    ADD COLUMN last_modified_at timestamp;