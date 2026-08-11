const router = require("express").Router();
const auth = require("../middlewares/auth");
const { createUser, login } = require("../controllers/users");
const {
  validateUserBody,
  validateAuthentication,
} = require("../middlewares/validation");
const userRouter = require("./users");
const itemRouter = require("./clothingItems");
const articleRouter = require("./articles");
const NotFoundError = require("../errors/not-found-err");

router.post("/signup", validateUserBody, createUser);
router.post("/signin", validateAuthentication, login);

router.use("/items", itemRouter);
router.use("/users", auth, userRouter);
router.use("/articles", articleRouter);

router.use((req, res, next) => {
  next(new NotFoundError("Requested resource not found"));
});

module.exports = router;