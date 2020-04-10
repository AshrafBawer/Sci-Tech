const router = require('express').Router();
const Post = require('../models/blog');
const Quote = require('../models/quote');

router.get('/', (req, res) => {
  Post.find({}, (err,posts) => {
    if(err) { req.flash('error', err.message); return res.redirect('back')};
    Quote.find({}, (err, quotes) => {
      if(err) { req.flash('error', err.message); return res.redirect('back')};
      let random = Math.floor(Math.random() * quotes.length);
      let quote = quotes[random];
       res.render('index', {posts, quote});
    });
  });
});

router.get('/about', (req, res) => {
  res.render('about');
});


module.exports = router;
