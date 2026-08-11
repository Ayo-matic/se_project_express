const router = require("express").Router();
const auth = require("../middlewares/auth");
const { validateArticleBody, validateArticleId } = require("../middlewares/validation");
const { getArticles, createArticle, deleteArticle } = require("../controllers/articles");

router.get("/", auth, getArticles);
router.post("/", auth, validateArticleBody, createArticle);
router.delete("/:articleId", auth, validateArticleId, deleteArticle);

module.exports = router;
