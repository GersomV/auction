const express = require("express");
const router = express.Router();

router.get("/signup", (req, res, next) => {
  res.render("auth/signup");
});

const Artist           = require("../models/artist");
const Buyer           = require("../models/buyer");
const bcrypt         = require("bcryptjs");
const bcryptSalt     = 10;

router.post("/signup", (req, res, next) => {
  const name = req.body.name;
  const password = req.body.password;
  const salt     = bcrypt.genSaltSync(bcryptSalt);
  const hashPass = bcrypt.hashSync(password, salt);

  Buyer.create({
    name: name,
    password: hashPass
  })
  .then(() => {
    res.redirect("/");
  })
  .catch(error => {
    next(error)
    console.log(error);
  })
});

router.get("/artistsignup", (req, res, next) => {
    res.render("auth/artistsignup");
  });

  

router.post("/artistsignup", (req, res, next) => {
  const Aname     = req.body.name;
  const password = req.body.password;
  const salt     = bcrypt.genSaltSync(bcryptSalt);
  const AhashPass = bcrypt.hashSync(password, salt);

  Artist.create({
    name: Aname,
    password: AhashPass
  })
  .then(() => {
    res.redirect("/");
  })
  .catch(error => {
    console.log(error);
  })
});

router.post("/login", (req, res, next) => {
    const theUsername = req.body.name;
    const thePassword = req.body.password;
  
    if (theUsername === "" || thePassword === "") {
      res.render("auth/login", {
        errorMessage: "Please enter both, username and password to sign up."
      });
      return;
    }
  
    Buyer.findOne({ "name": theUsername })
    .then(buyer => {
        if (!buyer) {
          res.render("auth/login", {
            errorMessage: "The username doesn't exist."
          });
          return;
        }
        if (bcrypt.compareSync(thePassword, buyer.password)) {
          // Save the login in the session!
          req.session.currentUser = buyer;
          res.redirect("/buyerloggedin")
          console.log("logged in")
        } else {
          res.render("auth/login", {
            errorMessage: "Incorrect password"
          });
        }
    })
    .catch(error => {
      next(error);
    })
  });
  

  router.post("/artistlogin", (req, res, next) => {
    const theUsername = req.body.name;
    const thePassword = req.body.password;
  
    if (theUsername === "" || thePassword === "") {
      res.render("auth/artistlogin", {
        errorMessage: "Please enter both, username and password to sign up."
      });
      return;
    }
  
    Artist.findOne({ "name": theUsername })
    .then(artist => {
        if (!artist) {
          res.render("auth/artistlogin", {
            errorMessage: "The username doesn't exist."
          });
          return;
        }
        if (bcrypt.compareSync(thePassword, artist.password)) {
          // Save the login in the session!
          req.session.currentUser = artist;
          res.redirect("/artistloggedin")
          console.log("logged in")
        } else {
          res.render("auth/artistlogin", {
            errorMessage: "Incorrect password"
          });
        }
    })
    .catch(error => {
      next(error);
    })
  });

module.exports = router;
