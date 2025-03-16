package routes

import (
	"github.com/gin-gonic/gin"
	"github.com/shreyash2503/blog-feed/middleware"
)

func FeedRoutes(router *gin.Engine) {
	router.Use(middleware.Authenticate)

	router.GET("/feed", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "Sending feed successfully",
		})

	})

}
