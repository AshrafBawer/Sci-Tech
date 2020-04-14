const router = require('express').Router();
const Comment = require('../models/comment');
const Post = require('../models/blog');
const middleware = require('../middlewares');

// create comment
router.post('/blog/:id/comment', (req, res) => {
  Comment.create(req.body.comment, (err, createdComment) => {
    if(err) { req.flash('error', 'Sorry, Something went wrong. Try again later.'); return res.redirect('back')};
    Post.findById(req.params.id, (err, foundPost) => {
      if(err) { req.flash('error', 'Sorry, Something went wrong. Try again later.'); return res.redirect('back')};
      foundPost.comments.push(createdComment);
      foundPost.save((err, data) => {
        if(err) { req.flash('error', 'Sorry, Something went wrong. Try again later.'); return res.redirect('back')};
        req.flash('success', 'Comment successfully created.');
        res.redirect(`/blog/${req.params.id}`);
      });
    });
  });
});

// delete comment and reply
router.delete('/blog/:id/comment/:comment_id/delete', middleware.isLoggedIn, (req, res) => {
  Comment.findByIdAndDelete(req.params.comment_id, (err) => {
    if(err) { req.flash('error', err.message); return res.redirect('back')};
    req.flash('success', 'Comment deleted successfully');
    res.redirect(`/blog/${req.params.id}`);
  });
});

// create reply for a comment
router.post('/blog/:id/comment/:comment_id/reply', (req, res) => {
  Comment.create(req.body.comment, (err, createdComment) => {
    if(err) { req.flash('error', 'Sorry, Something went wrong. Try again later.'); return res.redirect('back')};
    Comment.findById(req.params.comment_id, (err, foundComment) => {
      if(err) { req.flash('error', 'Sorry, Something went wrong. Try again later.'); return res.redirect('back')};
      foundComment.comments.push(createdComment);
      foundComment.save((err, data) => {
        if(err) { req.flash('error', 'Sorry, Something went wrong. Try again later.'); return res.redirect('back')};
        res.redirect(`/blog/${req.params.id}`);
      });
    });
  });
});

// Comment update seen property route
router.put('/blog/:id/comment/:comment_id/seen',middleware.isLoggedIn ,(req, res) => {
  Comment.findByIdAndUpdate(req.params.comment_id, { seen: true }, (err, updatedComment) => {
    if(err) { req.flash('error', err.message); return res.redirect('back')};
    res.redirect(`/blog/${req.params.id}`);
  });
});

// seen all button route
router.put('/blog/:id/comment/seenAll', middleware.isLoggedIn, (req,res) => {
    Comment.updateMany({}, {seen:true}, (err, updatedComments) => {
      if(err) { req.flash('error', err.message); return res.redirect('back')};
        res.redirect(`/blog/${req.params.id}`);
    })
});
module.exports = router;
