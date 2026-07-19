# WTWR (What to Wear?): Back End

The back-end server for the WTWR application. This project provides a REST API
for managing users and clothing items, built with Express.js and MongoDB.

## Functionality

- User resource: get all users, get a user by ID, create a user
- Clothing item resource: get all items, create an item, delete an item
- Like / unlike clothing items
- Data validation at the schema level (including URL validation with the
  `validator` package)
- Centralized error status codes (400, 404, 500) with JSON error messages

## Technologies

- Node.js / Express.js
- MongoDB / Mongoose
- ESLint (Airbnb base config) + Prettier

## Running the Project

`npm run start` — launch the server on port 3001

`npm run dev` — launch the server with hot reload (nodemon)

`npm run lint` — run the linter
