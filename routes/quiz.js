const express = require("express");
const Quiz = require("../models/quiz");
const router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  const show = !req.session.vote;
  const o = {};
  o["title"] = "Quiz";
  o["data"] = [];
  o["message"] = "";
  o["show"] = show;
  (async () => {
    return Quiz.find();
  })()
    .then((data) => {
      const sum = data.reduce((a, b) => a + b.vote, 0);
      o["data"] = data;
      o["sum"] = sum;
      res.render("quiz", o);
    })
    .catch((err) => {
      o["message"] = err.message;
      res.render("quiz", o);
    });
});

router.post("/", (req, res) => {
  const o = {};
  o["title"] = "Quiz";
  o["data"] = [];
  o["message"] = "";
  (async () => {
    const id = req.body.quiz;
    const data = await Quiz.findOne({ _id: id });
    data.vote += 1;
    req.session.vote = 1;
    return data.save();
  })()
    .then((data) => {
      res.redirect("/quiz");
    })
    .catch((err) => {
      console.log(err.message);
      res.render("quiz", o);
    });
});

module.exports = router;
