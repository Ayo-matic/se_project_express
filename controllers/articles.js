const Article = require("../models/article");
const BadRequestError = require("../errors/bad-request-err");
const ForbiddenError = require("../errors/forbidden-err");
const NotFoundError = require("../errors/not-found-err");

const getArticles = (req, res, next) => {
  Article.find({ owner: req.user._id })
    .then((articles) => res.send(articles))
    .catch(next);
};

const createArticle = (req, res, next) => {
  const { keyword, title, text, date, source, link, image } = req.body;
  Article.create({
    keyword,
    title,
    text,
    date,
    source,
    link,
    image,
    owner: req.user._id,
  })
    .then((article) => res.status(201).send(article))
    .catch((err) => {
      if (err.name === "ValidationError") {
        next(new BadRequestError("Invalid data provided for saving an article"));
      } else {
        next(err);
      }
    });
};

const deleteArticle = (req, res, next) => {
  const { articleId } = req.params;
  Article.findById(articleId)
    .orFail(() => new NotFoundError("Article not found"))
    .then((article) => {
      if (article.owner.toString() !== req.user._id) {
        return Promise.reject(new ForbiddenError("You cannot delete this article"));
      }
      return article.deleteOne().then(() => res.send(article));
    })
    .catch((err) => {
      if (err.name === "CastError") {
        next(new BadRequestError("Invalid article ID"));
      } else {
        next(err);
      }
    });
};

module.exports = { getArticles, createArticle, deleteArticle };
