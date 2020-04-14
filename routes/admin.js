const router = require('express').Router();
const Post = require('../models/blog');
const Comment = require('../models/comment');
const Quote = require('../models/quote');
const middleware = require('../middlewares');

// admin index route
router.get('/admin', middleware.isLoggedIn, (req, res) => {
  Post.find({}).populate('comments').exec((err, foundPosts) => {
    if(err) { req.flash('error', 'Sorry, Something went wrong. Try again later.'); return res.redirect('back')};
    Quote.find({}, (err, foundQuotes) => {
      if(err) { req.flash('error', 'Sorry, Something went wrong. Try again later.'); return res.redirect('back')};
      res.render('admin/index', { posts: foundPosts, quotes: foundQuotes });
    });
  });
});

// quotes routes

// quotes index route
router.get('/admin/quotes', middleware.isLoggedIn, (req, res) => {
  Quote.find({}, (err, quotes) => {
    if(err) { req.flash('error', err.message); return res.redirect('back')};
    res.render('admin/quote', { quotes });
  });
});

// quotes create route
router.post('/admin/quotes', middleware.isLoggedIn, (req, res) => {
  Quote.find({ body: req.body.quote.body }, (err, data) => {
    if(err) { req.flash('error', err.message); return res.redirect('back')};
    if (data.length == 0) {
      Quote.create(req.body.quote, (err, createdQuote) => {
        if(err) { req.flash('error', err.message); return res.redirect('back')};
        req.flash('success', createdQuote.body);
        res.status(200).send( { message: `Created Successfully :${createdQuote.body}` } );
      });
    } else {
      req.flash('error', 'This quote already exists')
      res.send("error");
    }
  });
});

// quotes delete route
router.delete('/admin/quotes/:id/delete', middleware.isLoggedIn, (req, res) => {
  Quote.findByIdAndDelete(req.params.id, (err) => {
    if(err) { req.flash('error', err.message); return res.redirect('back')};
    res.redirect('/admin/quotes');
  });
});

// admin blog route
router.get('/admin/blog', middleware.isLoggedIn, (req, res) => {
  Post.find({}, (err, posts) => {
    if(err) { req.flash('error', err.message); return res.redirect('back')};
    res.render('admin/blog', { posts })
  });
});

// count route -> a route to count posts, comments and quotes
router.get('/admin/count', middleware.isLoggedIn ,(req,res) => {
  let totalPosts = 0;
  let totalComments = 0;
  let totalQuotes = 0;
  let newComments = 0;
  let seenComments = 0;

  // recursive function to loop trhough all comments and its replies
  function recursiveCommentCount(comment){
    totalComments += 1;
    if(!comment.seen){
        newComments += 1;
    }
    if(comment.comments.length > 0){
        comment.comments.forEach((comment) => {
            recursiveCommentCount(comment);
        })
    }
  } 
  Post.find({}, (err, posts) => {
    if(err) { req.flash('error', err.message); return res.redirect('back')};
    // posts and comments count
    posts.forEach(post => {
      totalPosts += 1;
      post.comments.forEach( (comment) => {
          recursiveCommentCount(comment);
      });
    });

    // seen comments
    seenComments = totalComments - newComments;

      // count Quotes
    Quote.find({}, (err,quotes) => {
      if(err) { req.flash('error', err.message); return res.redirect('back')};
      quotes.forEach(quote => {
        totalQuotes += 1;
      });

      res.send({totalPosts, totalComments, newComments, seenComments, totalQuotes});
      
    });
  });

});

module.exports = router;
