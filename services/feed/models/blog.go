package models

import "time"

type Blog struct {
	ID             int        `db:"id"`
	Title          string     `db:"title"`
	Author         string     `db:"author"`
	Content        string     `db:"content"`
	IsPaid         bool       `db:"is_paid"`
	CategoryID     int        `db:"category_id"`
	CreatedAt      *time.Time `db:"created_at"`
	LastModifiedAt *time.Time `db:"last_modified_at"`
}
