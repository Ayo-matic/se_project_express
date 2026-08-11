require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { errors } = require("celebrate");
const mainRouter = require("./routes/index");
const { requestLogger, errorLogger } = require("./middlewares/logger");
const errorHandler = require("./middlewares/error-handler");

const app = express();
const { PORT = 3001, MONGODB_URI = "mongodb://127.0.0.1:27017/wtwr_db" } = process.env;

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("Connected to DB");
  })
  .catch(console.error);

app.use(cors());
app.use(express.json());

// request logger must be enabled before the routes
app.use(requestLogger);

// crash-test route for verifying that PM2 restarts the app after a crash
// TODO: remove this route after the project has passed code review
app.get("/crash-test", () => {
  setTimeout(() => {
    throw new Error("Server will crash now");
  }, 0);
});

app.use("/", mainRouter);

// error logger must be enabled after the routes and before the error handlers
app.use(errorLogger);

// celebrate error handler catches validation errors
app.use(errors());

// centralized error handler
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
