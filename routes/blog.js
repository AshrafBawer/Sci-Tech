const router = require('express').Router();
const Post = require('../models/blog');
const middleware = require('../middlewares');

// display all posts


router.get(['/blog', '/blog/page/:page'], (req,res) => {
    const resPerPage = 12;
    const Page = req.params.page || 1;
    var mySort = {_id:-1} // desendent sorting
    Post.find({}).sort(mySort).skip(
        (resPerPage * Page) - resPerPage
    ).limit(resPerPage).exec(function(err,posts){
        Post.countDocuments().exec(function(err,count) {
            if(err) { req.flash('error', 'Sorry, Something went wrong. Try again later.'); return res.redirect('back')};
            res.render('blog/blog', {
                posts:posts,
                currentPage:Page,
                pages: Math.ceil(count/resPerPage)
            });
        });
    });
});

// create form
router.get('/blog/new', middleware.isLoggedIn ,(req,res) => {
    res.render('blog/new');
});

// create route
router.post('/blog', middleware.isLoggedIn ,(req,res) => {
    req.body.post.body = req.sanitize(req.body.post.body);
    Post.create(req.body.post, (err,createdPost) => {
        if(err) { req.flash('error', err.message); return res.redirect('back')};
        req.flash('success', createdPost.title+' created successfully');
        res.redirect('/admin/blog');
    });
});

// show a single post
router.get('/blog/:id', (req,res) => {
    Post.findById(req.params.id).populate('commentss').exec( (err, foundPost) => {
        if(err) { req.flash('error', 'Sorry, Something went wrong. Try again later.'); return res.redirect('back')};
        res.render('blog/show', {post:foundPost});
    });
});

// edit form
router.get('/blog/:id/edit', middleware.isLoggedIn ,(req,res) => {
    Post.findById(req.params.id, (err, foundPost) => {
        if(err) { req.flash('error', err.message); return res.redirect('back')};
        res.render('blog/edit', {post:foundPost});
    });
});

// edit route
router.put('/blog/:id', middleware.isLoggedIn ,(req,res) => {
    req.body.post.body = req.sanitize(req.body.post.body);
    Post.findByIdAndUpdate(req.params.id, req.body.post, (err, editedPost) => {
        if(err) { req.flash('error', err.message); return res.redirect('back')};
        req.flash('success', 'Edited successfully');
        res.redirect('/admin');
    });
});

// delete route
router.delete('/blog/:id', middleware.isLoggedIn ,(req,res) => {
    Post.findByIdAndDelete(req.params.id, (err) => {
        if(err) { req.flash('error', err.message); return res.redirect('back')};
        req.flash('success','Deleted successfully');
        res.redirect('/admin');
    });
});


module.exports = router;