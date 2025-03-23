package models

import "time"

type Like struct {
	ID             int        `db:"id"`
	LikeType       string     `db:"like_type"`
	BlogID         int        `db:"blog_id"`
	UserID         string     `db:"user_id"`
	CategoryID     int        `db:"category_id"`
	CreatedAt      *time.Time `db:"created_at"`
	LastModifiedAT *time.Time `db:"last_modified_at"`
}
