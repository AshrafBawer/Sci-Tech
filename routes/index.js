const router = require('express').Router();
const Post = require('../models/blog');
const Quote = require('../models/quote');

router.get('/', (req, res) => {
  Post.find({}, (err,posts) => {
    if(err) { req.flash('error', 'Sorry, Something went wrong. Try again later.'); return res.redirect('back')};
    Quote.find({}, (err, quotes) => {
      if(err) { req.flash('error', 'Sorry, Something went wrong. Try again later.'); return res.redirect('back')};
      let random = Math.floor(Math.random() * quotes.length);
      let quote = quotes[random];
       res.render('index', {posts, quote});
    });
  });
});

router.get('/about', (req, res) => {
  res.render('about');
});

router.get('/search/:title', (req,res) => {
  Post.find({title:{'$regex' : ''+req.params.title+'', '$options' : 'i'}}).limit(10).exec((err,foundPosts) => {
    if(err) return err;
    res.send(foundPosts);
  });
});
module.exports = router;
