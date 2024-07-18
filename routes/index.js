var express = require("express");
var router = express.Router();
const login = "admin";
const password = "123";

/* GET home page. */
router.get("/", function (req, res, next) {
  console.log(req.session);
  res.render("index", { title: "Express" });
});

router.get("/login", (req, res) => {
  res.render("login", { title: "Logowanie" });
});

router.post("/login", (req, res) => {
  const body = req.body;
  if (body.login === login && body.password === password) {
    req.session.admin = 1;
    res.redirect("/admin");
  } else {
    res.redirect("/login");
  }
});

module.exports = router;
