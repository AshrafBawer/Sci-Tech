const router = require('express').Router();
const Comment = require('../models/comment');
const Post = require('../models/blog');
const middleware = require('../middlewares');

// create comment
router.post('/blog/:id/comment', middleware.isLoggedIn ,(req,res) => {
    Comment.create(req.body.comment, (err, createdComment) => {
        if(err) { req.flash('error', 'Something went wrong. try agian later'); return res.redirect('back');};
        Post.findById(req.params.id, (error, foundPost) => {
            if(error) { req.flash('error', 'Something went wrong. try agian later'); return res.redirect('back');};
            foundPost.comments.push(createdComment);
            foundPost.save((err, data) => {
                if(err) { req.flash('error', 'Something went wrong. try agian later'); return res.redirect('back');};
                req.flash('success', 'Comment successfully created and after aproval will be displayed');
                res.redirect('/blog/'+ req.params.id);
            });
        });
    });
});

// delete comment
router.delete('/blog/:id/comment/:comment_id/delete', middleware.isLoggedIn ,(req,res) => {
    Comment.findByIdAndDelete(req.params.comment_id, (err) => {
        if(err) { req.flash('error', 'Something went wrong. try agian later'); return res.redirect('back');};
        res.flash('success', 'Comment deleted successfully');
        res.redirect('/admin');
    });
});

// create reply for a comment
router.post('/blog/:id/comment/:comment_id/reply', middleware.isLoggedIn, (req,res) => {
    Comment.create(req.body.comment, (err, createdComment) => {
        if(err) { req.flash('error', 'Something went wrong. try agian later'); return res.redirect('back');};
        Comment.findById(req.params.comment_id, (err, foundComment) => {
            if(err) { req.flash('error', 'Something went wrong. try agian later'); return res.redirect('back');};
            foundComment.comments.push(createdComment);
            foundComment.save((err, data) => {
                if(err) { req.flash('error', 'Something went wrong. try agian later'); return res.redirect('back');};
                res.redirect('/blog/'+ req.params.id);
            });
        });
    });
});

router.delete('/blog/:id/comment/:comment_id/reply/:reply_id/delete', middleware.isLoggedIn, (req,res) => {
    Comment.findByIdAndDelete(req.params.reply_id, (err) => {
        if(err) { return err };
        res.redirect('/admin');
    });
});

module.exports = router;