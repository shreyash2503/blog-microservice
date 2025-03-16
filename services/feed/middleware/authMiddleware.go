package middleware

import (
	"encoding/base64"
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

func authenticateToken(token string) (bool, error) {
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
		return false, errors.New("not able to create http client")
	}

	req.Header.Set("Authorization", fmt.Sprintf("Bearer %v", token))
	req.Header.Set("Content-Type", "application/json")

	res, err := client.Do(req)

	if err != nil {
		return false, errors.New("validation client not available")
	}

	defer res.Body.Close()

	body, err := io.ReadAll(res.Body)

	if err != nil {
		return false, errors.New("not a valid response from the validation client")
	}

	return strings.TrimSpace(string(body)) == "true", nil
}

func Authenticate(c *gin.Context) {
	token := c.Request.Header.Get("Authorization")

	if token == "" {
		c.JSON(403, gin.H{
			"error": "Authentication failed",
		})
		c.Abort()
		return
	}

	token = strings.Split(token, " ")[1]

	isValid, err := authenticateToken(token)

	if err != nil || !isValid {
		c.JSON(403, gin.H{
			"error": "Authentication failed",
		})
		c.Abort()
		return
	}

	payload := strings.Split(token, ".")[1]

	dpayload, err := base64.StdEncoding.DecodeString(payload)

	if err != nil {
		c.JSON(403, gin.H{
			"error": "Authentication failed",
		})
		c.Abort()
		return
	}

	var pload Payload
	error := json.Unmarshal(dpayload, &pload)

	if error != nil {
		c.JSON(403, gin.H{
			"error": "Authentication failed",
		})
		c.Abort()
		return
	}
	fmt.Println(pload.Email)

	c.Set("email", pload.Email)
}
