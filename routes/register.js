const router = require('express').Router();
const passport = require('passport');
// admin model
const Admin = require('../models/admin');
// middleware
const middleware = require('../middlewares');


router.get('/admin/register', (req,res) => {
    Admin.find({}, (err,data) => {
        if(err) { req.flash('error', err.message); return res.redirect('back')};
        if(data.length == 0) {
            res.render('admin/register');
        }else {
            req.flash('error', 'Admin is already registered! try to login.');
            res.redirect('/admin/login');
        }
    });
});

router.post('/admin/register', (req,res) => {
    Admin.find({}, (err,data) => {
        if(err) { req.flash('error', err.message); return res.redirect('back')}
        else if(data.length == 0) {
            Admin.register(new Admin({username: req.body.username, email: req.body.email}), req.body.password, function(err, admin){
                if(err) { req.flash('error', err.message); return res.redirect('back')}
                else {
                    req.flash('success', 'Admin registered. Login as admin.');
                    res.redirect('/admin/login');
                }
            });
        }else {
            req.flash('error', 'Admin is already registered! try to login.');
            res.redirect('/admin/login');
        }
    });
});

router.get('/admin/login', (req,res) => {
    Admin.find({}, (err,data) => {
        if(err) { req.flash('error', err.message); return res.redirect('back')}
        else if(data.length == 0) {
            req.flash('warning', 'You have to register as admin first. this is the only time you\'ll need to register.');
            res.redirect('/admin/register');
        }else {
            res.render('admin/login');
        }
    });
});

router.post('/admin/login', passport.authenticate('local', {
    successRedirect: '/admin',
    failureRedirect: '/admin/login'
}),(req,res) => {});

router.get('/admin/logout', middleware.isLoggedIn , (req,res) => {
    req.flash('success', 'Admin logout successfully');
    req.logout();
    res.redirect('/');
});

module.exports = router;


