package services

import (
	"context"
	"errors"
	"time"

	"inscribeai/backend/models"

	"github.com/golang-jwt/jwt/v5"
	"golang.org/x/crypto/bcrypt"
)

type UserStore interface {
	GetUserByEmail(ctx context.Context, email string) (models.User, error)
	CreateUser(ctx context.Context, u models.User) (models.User, error)
}

type AuthService struct {
	users     UserStore
	jwtSecret []byte
}

func NewAuthService(users UserStore, jwtSecret string) *AuthService {
	return &AuthService{users: users, jwtSecret: []byte(jwtSecret)}
}

func (a *AuthService) Register(ctx context.Context, name, email, password string) (models.User, string, error) {
	if _, err := a.users.GetUserByEmail(ctx, email); err == nil {
		return models.User{}, "", errors.New("email already registered")
	}
	hashed, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		return models.User{}, "", err
	}
	user, err := a.users.CreateUser(ctx, models.User{Name: name, Email: email, Password: string(hashed), CreatedAt: time.Now().UTC()})
	if err != nil {
		return models.User{}, "", err
	}
	token, err := a.issueJWT(user)
	return user, token, err
}

func (a *AuthService) Login(ctx context.Context, email, password string) (models.User, string, error) {
	user, err := a.users.GetUserByEmail(ctx, email)
	if err != nil {
		return models.User{}, "", errors.New("invalid credentials")
	}
	if bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(password)) != nil {
		return models.User{}, "", errors.New("invalid credentials")
	}
	token, err := a.issueJWT(user)
	return user, token, err
}

func (a *AuthService) issueJWT(user models.User) (string, error) {
	claims := jwt.MapClaims{
		"sub":   user.ID,
		"email": user.Email,
		"exp":   time.Now().Add(24 * time.Hour).Unix(),
	}
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	return token.SignedString(a.jwtSecret)
}
