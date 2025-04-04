package models

import "time"

type Blog struct {
	ID             int        `db:"id" json:"id"`
	Title          string     `db:"title" json:"title"`
	Author         string     `db:"author" json:"author"`
	Content        string     `db:"content" json:"content"`
	IsPaid         bool       `db:"is_paid" json:"is_paid"`
	CategoryID     int        `db:"category_id" json:"category_id"`
	CoverImage     *string    `db:"cover_image" json:"cover_image"`
	CreatedAt      *time.Time `db:"created_at" json:"created_at"`
	LastModifiedAt *time.Time `db:"last_modified_at" json:"last_modified_at"`
}
