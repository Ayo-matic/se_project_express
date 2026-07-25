# WTWR (What to Wear?): Back End

The back-end server for the WTWR application. This project provides a REST
API for users and clothing items, built with Express.js and MongoDB, and
implements JWT-based authentication and authorization.

## Functionality

- User registration and login (`POST /signup`, `POST /signin`)
- Passwords are hashed with bcrypt before being stored; never returned in
  API responses
- JSON Web Tokens (7-day expiration) issued on login and required for
  protected routes
- Authorization middleware verifies the token on every protected request
  and attaches the user's identity to `req.user`
- Authenticated user can view and update their own profile
  (`GET /users/me`, `PATCH /users/me`)
- Clothing item resource: get all items (public), create an item, delete
  an item (owner only), like / unlike items
- Data validation at the schema level (including email and URL validation
  with the `validator` package)
- Centralized error status codes (400, 401, 403, 404, 409, 500) with JSON
  error messages
- CORS enabled for front-end integration

## Technologies

- Node.js / Express.js
- MongoDB / Mongoose
- bcryptjs (password hashing) / jsonwebtoken (JWT auth)
- ESLint (Airbnb base config) + Prettier

## Running the Project

`npm run start` — launch the server on port 3001

`npm run dev` — launch the server with hot reload (nodemon)

`npm run lint` — run the linter

## Authentication

Set the `JWT_SECRET` environment variable in production to a strong,
private value. In development, a fallback secret is used automatically.

Protected routes expect an `Authorization: Bearer <token>` header. The
following routes do not require authentication:

- `POST /signup`
- `POST /signin`
- `GET /items`
