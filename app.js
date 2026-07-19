const express = require("express");
const mongoose = require("mongoose");
const mainRouter = require("./routes/index");

const app = express();
const { PORT = 3001 } = process.env;

mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => {
    console.log("Connected to DB");
  })
  .catch(console.error);

app.use(express.json());

// Temporary authorization middleware (will be replaced in the next sprint).
// Replace the _id below with the _id of the test user you create via Postman.
app.use((req, res, next) => {
  req.user = {
    _id: "REPLACE_WITH_YOUR_TEST_USER_ID",
  };
  next();
});

app.use("/", mainRouter);

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
