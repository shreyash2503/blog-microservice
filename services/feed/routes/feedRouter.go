package routes

import (
	"github.com/gin-gonic/gin"
	"github.com/shreyash2503/blog-feed/controllers"
	"github.com/shreyash2503/blog-feed/db"
	"github.com/shreyash2503/blog-feed/middleware"
)

func FeedRoutes(router *gin.Engine) {
	router.Use(middleware.Authenticate)

	router.GET("/feed", func(c *gin.Context) {
		username, _ := c.Get("username")
		blogs, err := controllers.GetFeed(username.(string), db.DB)
		if err != nil {
			c.JSON(500, gin.H{
				"error": "Internal server error",
			})
		}

		c.JSON(200, gin.H{
			"data": blogs,
		})
	})

}
