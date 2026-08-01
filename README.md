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
- Request-level data validation with `celebrate`/`Joi`, so malformed
  requests are rejected before they reach the controllers
- Centralized error handling: custom error classes
  (`BadRequestError`, `UnauthorizedError`, `ForbiddenError`,
  `NotFoundError`, `ConflictError`) and a single error-handling
  middleware at the end of `app.js`
- Request and error logging with `winston` / `express-winston`
  (`request.log` and `error.log`)
- CORS enabled for front-end integration

## Technologies

- Node.js / Express.js
- MongoDB / Mongoose
- bcryptjs (password hashing) / jsonwebtoken (JWT auth)
- celebrate / Joi (request validation)
- winston / express-winston (logging)
- dotenv (environment variables)
- ESLint (Airbnb base config) + Prettier

## Running the Project

`npm run start` — launch the server on port 3001

`npm run dev` — launch the server with hot reload (nodemon)

`npm run lint` — run the linter

## Environment Variables

This project uses `dotenv` to load configuration from a `.env` file
(never committed — see `.gitignore`). Create a `.env` file in the project
root with:

```
NODE_ENV=production
JWT_SECRET=<a strong, random 256-bit key>
```

In development, if `JWT_SECRET` isn't set, a fallback secret is used
automatically.

## Authentication

Protected routes expect an `Authorization: Bearer <token>` header. The
following routes do not require authentication:

- `POST /signup`
- `POST /signin`
- `GET /items`

## Deployment

- **Domain name:** (https://ayomatic.duckdns.org)
- **Frontend repo:** (https://github.com/Ayo-matic/se_project_react.git)
- **Project pitch video:** 

The app is deployed on a Google Cloud VM, served through nginx (reverse
proxy + HTTPS via Certbot), and kept running with the PM2 process
manager.
