package main

import (
	"os"

	"github.com/gin-gonic/gin"
	"github.com/shreyash2503/blog-feed/db"
)





func main() {
	db.InitDB()
	port := os.Getenv("PORT")
	
	if port == "" {
		port = "8777"
	}

	router := gin.New()
	router.Use(gin.Logger())

	router.GET("/feed", func (c* gin.Context) {
		c.JSON(200, gin.H{
			"success" : "Access granted",
		})
	})


	router.Run(":"+ port)

}