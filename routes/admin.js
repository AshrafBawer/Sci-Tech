const router = require('express').Router();
const Post = require('../models/blog');
const Comment = require('../models/comment');
const Quote = require('../models/quote');
const middleware = require('../middlewares');

// admin index route
router.get('/admin', middleware.isLoggedIn, (req, res) => {
  Post.find({}).populate('comments').exec((err, foundPosts) => {
    if (err) { req.flash('error', 'Sorry we can\'t connect to the database at the moment. try agian later'); return err; }
    res.render('admin/index', { posts: foundPosts });
  });
});

// comment approve route
router.put('/admin/comment/:id/approve', middleware.isLoggedIn, (req, res) => {
  Comment.findByIdAndUpdate(req.params.id, { approve: true }, (err, updatedComment) => {
    if (err) { req.flash('error', 'Sorry we can\'t connect to the database at the moment. try agian later'); return err; }
    res.redirect('/admin');
  });
});

// comment desapprove route
router.put('/admin/comment/:id/disapprove', middleware.isLoggedIn, (req, res) => {
  Comment.findByIdAndUpdate(req.params.id, { approve: false }, (err, updatedComment) => {
    if (err) { req.flash('error', 'Sorry we can\'t connect to the database at the moment. try agian later'); return err; }
    res.redirect('/admin');
  });
});


// quotes routes

// quotes index route
router.get('/admin/quotes', middleware.isLoggedIn, (req, res) => {
  Quote.find({}, (err, quotes) => {
    if (err) { req.flash('error', 'Sorry we can\'t connect to the database at the moment. try agian later'); return err; }
    res.render('admin/quote', { quotes });
  });
});

// quotes create route
router.post('/admin/quotes', middleware.isLoggedIn, (req, res) => {
  Quote.find({ body: req.body.quote.body }, (err, data) => {
    if (err) { req.flash('error', 'Sorry we can\'t connect to the database at the moment. try agian later'); return err; }
    if (data.length == 0) {
      Quote.create(req.body.quote, (err, createdQuote) => {
        if (err) { req.flash('error', 'Sorry we can\'t connect to the database at the moment. try agian later'); return err; }
        req.flash('success', createdQuote.body);
        res.redirect('/admin');
      });
    } else {
      req.flash('error', 'This quote already exists');
      res.redirect('/admin');
    }
  });
});

// quotes delete route
router.delete('/admin/quotes/:id/delete', middleware.isLoggedIn, (req, res) => {
  Quote.findByIdAndDelete(req.params.id, (err) => {
    if (err) { req.flash('error', 'Sorry we can\'t connect to the database at the moment. try agian later'); return err; }
    res.redirect('/admin/quotes');
  });
});

// admin blog route
router.get('/admin/blog', (req, res) => {
  Post.find({}, (err, posts) => {
    if (err) { req.flash('error', 'Something went wrong. try again later'); console.log(err); return res.redirect('back'); }
    res.render('admin/blog', { posts })
  });
});
module.exports = router;
