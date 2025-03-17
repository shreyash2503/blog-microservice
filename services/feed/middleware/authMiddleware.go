package middleware

import (
	"encoding/json"
	"errors"
	"fmt"
	"io"
	"net/http"
	"os"
	"strings"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

type Payload struct {
	Email string `json:"email"`
}

type TokenValidationResponse struct {
	Valid  bool     `json:"valid`
	Roles  []string `json:"roles`
	UserId string   `json:"user_id`
}

func authenticateToken(token string) (bool, string, error) {
	e := godotenv.Load()
	if e != nil {
		fmt.Print("Error Loading .env file")
		os.Exit(0)
	}
	url := os.Getenv("AUTH_URL")

	client := &http.Client{}

	req, err := http.NewRequest("GET", url, nil)

	if err != nil {
		fmt.Println(err)
		return false, "", errors.New("not able to create http client")
	}

	req.Header.Set("Authorization", fmt.Sprintf("Bearer %v", token))

	res, err := client.Do(req)

	if err != nil {
		return false, "", errors.New("validation client not available")
	}

	defer res.Body.Close()

	body, err := io.ReadAll(res.Body)
	fmt.Print(string(body))
	var response TokenValidationResponse
	error := json.Unmarshal(body, &response)

	if error != nil {
		return false, "", errors.New("not a valid response from the validation client")
	}

	return response.Valid, response.UserId, nil
}

func Authenticate(c *gin.Context) {
	token := c.Request.Header.Get("Authorization")
	fmt.Println(token)

	if token == "" {
		c.JSON(403, gin.H{
			"error": "Authentication failed",
		})
		c.Abort()
		return
	}

	token = strings.Split(token, " ")[1]

	isValid, userId, err := authenticateToken(token)
	fmt.Println(isValid, err)

	if err != nil || !isValid {
		c.JSON(403, gin.H{
			"error": "Authentication failed",
		})
		c.Abort()
		return
	}

	c.Set("email", userId)
	c.Next()
}
