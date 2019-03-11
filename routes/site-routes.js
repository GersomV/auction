
const express = require("express");
const router = express.Router();
const mongoose = require('mongoose')
const Work = require("../models/work")
const Buyer = require("../models/buyer")
const Artist = require("../models/artist")
const bodyParser = require("body-parser")
router.get("/", (req, res, next) => {
  res.render("home");
});

router.use((req, res, next) => {
  if (req.session.currentUser) { 
    next(); 
  } else {                          
    res.redirect("/login");
    console.log("something's wrong")         
  }                                 
}); 

router.get("/buyerloggedin", (req, res) => {
    const Works = Work;
    Works.find().populate('artist')
    .then(works => {
      res.render("buyerloggedin", { works })
      console.log(works)
    }).catch(e => {
      console.log(e)
    })
  });


  router.get('/singlework/:id', function(req, res) {
    const Works = Work
    Works.findOne({_id: req.params.id}).populate('artist')
    .then(work => {
        console.log(req.session.currentUser.name)
      res.render('singlework', 
      {work, buyer:req.session.currentUser, artist:req.session.currentUser});
    });
  })

  router.get('/painter/:artist', function(req, res) {
    const Works = Work
    Works.find({artist: req.params.artist}).populate('artist') 
    //.then(Works.find({artist: req.params.artist.name}))
    .then(works => {
        console.log(works)
      res.render('painter',
      {works, buyer:req.session.currentUser, artist:req.session.currentUser});
    });
  })

  router.get('/collection/:theme', function(req, res) {
    const Works = Work
    Works.find({theme: req.params.theme}).populate('artist')
    .then(works => {
        console.log(works)
      res.render('collection',
      {works, buyer:req.session.currentUser, artist:req.session.currentUser});
    });
  })
  
  router.post('/singlework', (req, res) => {
    const Works = Work
    const bids = req.body.bid;
    const buyer = req.session.currentUser.name
    //if (bid >)
    Works.updateOne({ _id: req.query.work_id },{ $max: { bids: bids },buyer })//, {bids, buyer}){ $push:{bids: bid, buyer}})
    .then(work => {
    res.redirect('/singlework/' + req.query.work_id)
  //   res.redirect('/buyerloggedin')
    })
    .catch((e) => {
     console.log(e)
   })
  })
  
  router.get("/buyerloggedin", (req, res) => {
    const Works = Work;
    Works.find().populate('artist')
    .then(works => {
      res.render("buyerloggedin", { works, buyer:req.session.currentUser, artist:req.session.currentUser })
      console.log(works)
    }).catch(e => {
      console.log(e)
    })
  });
  router.get("/artistloggedin", (req, res)=> {
      const Works = Work
      Works.find({artist: req.session.currentUser}).populate("artist")
      .then(works => {
        res.render("artistloggedin", { works, buyer:req.session.currentUser, artist:req.session.currentUser })
        console.log(works)
      }).catch(e => {
        console.log(e)
      })
    })


  router.post('/artistloggedin', (req, res) => {
    const Works = Work
    const title = req.body.title
    const description = req.body.description
    //const date = req.body
    const theme = req.body.theme
    const image = req.body.image
    const artist = req.session.currentUser
    Works.create({title, description, theme, image, artist})
        .then(work => {
            res.redirect('/artistloggedin')
            })
            .catch((e) => {
             console.log(e)
           })
          })
  

module.exports = router;

