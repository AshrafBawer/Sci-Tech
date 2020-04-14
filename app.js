const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const flash = require('connect-flash');
const expressSanitizer = require('express-sanitizer');

// routes
const indexRoutes  = require('./routes/index');
const blogRoutes = require('./routes/blog');
const commentRoutes = require('./routes/comment');
const adminRoutes = require('./routes/admin');
const registerRoutes = require('./routes/register');

// configuration
app.use(flash());
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride('_method'));
app.use(expressSanitizer());

// database configuration
mongoose.connect('mongodb://localhost/blog', {useNewUrlParser:true, useUnifiedTopology: true, useCreateIndex: true});

// authentication
const passport = require('passport');
const passportLocal = require('passport-local');
const expressSession = require('express-session');

// admin model
const Admin = require('./models/admin');

// authentication configuration
app.use(expressSession({
  secret: "It can be anything I want",
  resave: false,
  saveUninitialized: false,
}));

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(Admin.serializeUser());
passport.deserializeUser(Admin.deserializeUser());

passport.use(new passportLocal(Admin.authenticate()));

// global variables (variables that are passed to all templates)
app.use(function(req,res,next) {
  res.locals.error = req.flash('error');
  res.locals.success = req.flash('success');
  res.locals.warning = req.flash('warning');
  res.locals.admin  = req.user;
  next();
});

// routes

// index
app.use(indexRoutes);

// blog
app.use(blogRoutes);

// comment
app.use(commentRoutes);

// admin
app.use(adminRoutes);

// register 
app.use(registerRoutes);





app.listen(3000, () => {
  console.log('Server started on port 3000');
});
