package db

import (
	"fmt"
	"log"
	"os"

	"github.com/jmoiron/sqlx"
	"github.com/joho/godotenv"
	_ "github.com/lib/pq"
)

var DB *sqlx.DB

func InitDB() {
	e := godotenv.Load()

	if e != nil {
		fmt.Println("Error loading .env file")
	}

	dsn := os.Getenv("DATABASE_URL")
	fmt.Println(dsn)
	var err error
	DB, err = sqlx.Connect("postgres", dsn)
	if err != nil {
		log.Fatalf("Error connecting to DB: %v", err)
	}

	fmt.Println("Database connection successfull!")
}
