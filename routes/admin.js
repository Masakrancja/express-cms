var express = require("express");
const News = require("../models/news");
var router = express.Router();

router.all("*", (req, res, next) => {
  if (!req.session.admin) {
    res.redirect("/login");
    return;
  }
  next();
});

/* GET home page. */
router.get("/", function (req, res, next) {
  const o = {};
  o["title"] = "Admin";
  (async () => {
    return News.find();
  })()
    .then((data) => {
      o["data"] = data;
      o["message"] = "";
      res.render("admin/index", o);
    })
    .catch((err) => {
      o["data"] = [];
      o["message"] = err.message;
      res.render("admin/index", o);
    });
});

router.get("/news/add", (req, res) => {
  const body = req.body;
  res.render("admin/newsAdd", { title: "Dodaj Newsa", body });
});

router.post("/news/add", (req, res) => {
  const body = req.body;
  const news = new News(body);
  (async () => {
    return await news.save();
  })()
    .then((result) => {
      res.redirect("/admin");
    })
    .catch((err) => {
      res.render("admin/newsAdd", {
        title: "Dodaj Newsa",
        message: err.message,
        body,
      });
    });
});

router.get("/news/delete/:id", (req, res) => {
  const id = req.params.id;
  (async () => {
    return await News.findByIdAndDelete(id);
  })()
    .then((result) => {
      res.redirect("/admin");
    })
    .catch((err) => {
      res.render("admin/newsAdd", {
        title: "Admin",
        message: err.message,
      });
    });
});

module.exports = router;
