package routes

import (
	"fmt"

	"github.com/gin-gonic/gin"
	"github.com/shreyash2503/blog-feed/controllers"
	"github.com/shreyash2503/blog-feed/db"
	"github.com/shreyash2503/blog-feed/middleware"
)

func FeedRoutes(router *gin.Engine) {
	router.Use(middleware.Authenticate)

	router.GET("/feed", func(c *gin.Context) {
		email, _ := c.Get("email")
		blogs, err := controllers.GetFeed(email.(string), db.DB)
		fmt.Println("Happening")
		if err != nil {
			c.JSON(500, gin.H{
				"error": "Internal server error",
			})
			return
		}

		c.JSON(200, gin.H{
			"data": blogs,
		})
	})

}
