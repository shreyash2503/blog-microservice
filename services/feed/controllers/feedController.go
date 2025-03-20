package controllers

import (
	"log"
	"strconv"
	"strings"

	"github.com/jmoiron/sqlx"
	"github.com/shreyash2503/blog-feed/models"
)

func GetFeed(username string, db *sqlx.DB) ([]models.Blog, error) {
	var likes []models.Like
	likesQuery := `SELECT * FROM likes WHERE user_id = $1 and like_type = $2`

	err := db.Select(&likes, likesQuery, username, "like")

	if err != nil {
		log.Println("Error fetching likes::", err)
		return nil, err
	}

	var categories []int

	for _, like := range likes {
		category := like.CategoryID
		categories = append(categories, category)
	}

	strArray := make([]string, len(categories))

	for i, num := range categories {
		strArray[i] = strconv.Itoa(num)
	}

	categoriesString := strings.Join(strArray, ",")

	blogsQuery := `SELECT * from blog WHERE category_id ANY(ARRAY[$1])`

	var blogs []models.Blog

	error := db.Select(&blogs, blogsQuery, categoriesString)

	if error != nil {
		log.Println("Error fetching the blogs::", error)
		return nil, error
	}

	return blogs, nil
}
