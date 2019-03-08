const express = require('express');
const router  = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index');
});

router.get("/login", (req, res, next) => {
  res.render("auth/login");
});

router.get("/artistlogin", (req, res, next) => {
  res.render("auth/artistlogin");
});
module.exports = router;
