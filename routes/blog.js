const router = require('express').Router();
const Post = require('../models/blog');
const middleware = require('../middlewares');

// display all posts
router.get('/blog', (req,res) => {
    Post.find({}, (err, posts) => {
        if(err) { req.flash('error', 'Sorry we can\'t connect to the database at the moment. try agian later'); return err};
        res.render('blog/blog', {posts});
    });
});

// create form
router.get('/blog/new', middleware.isLoggedIn ,(req,res) => {
    res.render('blog/new');
});
// create route
router.post('/blog', middleware.isLoggedIn ,(req,res) => {
    Post.create(req.body.post, (err,createdPost) => {
        if(err) { req.flash('error', 'Sorry we can\'t connect to the database at the moment. try agian later'); return err};
        req.flash('success', createdPost.title+' created successfully');
        res.redirect('/admin');
    });
});

// show a single post
router.get('/blog/:id', (req,res) => {
    Post.findById(req.params.id).populate('comments').exec( (err, foundPost) => {
        if(err) { req.flash('error', 'Sorry we can\'t connect to the database at the moment. try agian later'); return err};
        res.render('blog/show', {post:foundPost});
    });
});

// edit form
router.get('/blog/:id/edit', middleware.isLoggedIn ,(req,res) => {
    Post.findById(req.params.id, (err, foundPost) => {
        if(err) { req.flash('error', 'Sorry we can\'t connect to the database at the moment. try agian later'); return err};
    
        res.render('blog/edit', {post:foundPost});
    });
});

// edit route
router.put('/blog/:id', middleware.isLoggedIn ,(req,res) => {
    Post.findByIdAndUpdate(req.params.id, req.body.post, (err, editedPost) => {
        if(err) { req.flash('error', 'Sorry we can\'t connect to the database at the moment. try agian later'); return err};
        req.flash('success', 'Edited successfully');
        res.redirect('/admin');
    });
});

// delete route
router.delete('/blog/:id', middleware.isLoggedIn ,(req,res) => {
    Post.findByIdAndDelete(req.params.id, (err) => {
        if(err) { req.flash('error', 'Sorry we can\'t connect to the database at the moment. try agian later'); return err};
        req.flash('success','Deleted successfully');
        res.redirect('/admin');
    });
});


module.exports = router;