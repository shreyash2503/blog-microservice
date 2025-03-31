package controllers

import (
	"log"

	"github.com/jmoiron/sqlx"
	"github.com/lib/pq"
	"github.com/shreyash2503/blog-feed/models"
)

func GetFeed(username string, db *sqlx.DB) ([]models.Blog, error) {
	var likes []models.Like
	likesQuery := `SELECT * FROM _like WHERE user_id = 'shreyashtekade2512@gmail.com' and like_type = $1`

	err := db.Select(&likes, likesQuery, "LIKE")

	if err != nil {
		return nil, err
	}

	categories := make([]int, len(likes))

	for index, like := range likes {
		categories[index] = like.CategoryID
	}

	if len(categories) == 0 {
		return []models.Blog{}, nil

	}

	blogsQuery := `SELECT * from blog WHERE category_id = ANY($1::int[])`

	var blogs []models.Blog

	error := db.Select(&blogs, blogsQuery, pq.Array(categories))

	if error != nil {
		log.Println("Error fetching the blogs::", error)
		return nil, error
	}

	return blogs, nil
}
