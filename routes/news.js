const express = require("express");
const News = require("../models/news");
const router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  const search = req.query.search || "";
  const o = {};
  o["title"] = "News";
  o["message"] = "";
  o["data"] = [];
  o["search"] = search;

  (async () => {
    return await News.find(
      search ? { title: new RegExp(search, "i") } : {}
    ).sort({
      created: -1,
    });
  })()
    .then((data) => {
      o["data"] = data;
      console.log(o);
      res.render("news", o);
    })
    .catch((err) => {
      o["message"] = err.message;
      console.log(o);
      res.render("news", o);
    });
});

module.exports = router;
