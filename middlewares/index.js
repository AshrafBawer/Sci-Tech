
let middleware = {};

middleware.isLoggedIn = function(req,res,next) {
    if(req.isAuthenticated()){
        return next();
    }
    req.flash('error', 'Please login first.');
    res.redirect('/admin/login');
}

module.exports = middleware;