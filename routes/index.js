const router = require('express').Router();
const Post = require('../models/blog');
const Quote = require('../models/quote');
const nodemailer = require('nodemailer');
const creds = require('../config');

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

// contact from
router.get('/contact', (req, res) => {
  res.render('contact');
});

// send email route
router.post('/contact', (req,res) => {
  var transport = {
    host: 'smtp.gmail.com',
    auth: {
      user: creds.email.name,
      pass: creds.email.pass
    }
  }
  var transporter = nodemailer.createTransport(transport)
  
  transporter.verify((error, success) => {
    if (error) {
      console.log('error eith nodemailer'+error);
    } else {
      console.log('Server is ready to take messages');
    }
  });

  var name = req.body.name;
  var email = req.body.email;
  var message = req.body.message;
  var content = `name: ${name} \n email: ${email} \n message: ${message} `;

  var mail = {
    from: name,
    to: creds.email.name,  //Change to email address that you want to receive messages on
    subject: 'New Message from Sci-Tech blog',
    text: content
  }

  transporter.sendMail(mail, (err, data) => {
    if (err) {
          res.json({
            msg: 'fail'
          })
        } else {
          res.json({
            msg: 'success'
        })
    }
  });

})

router.get('/search/:title', (req,res) => {
  Post.find({title:{'$regex' : ''+req.params.title+'', '$options' : 'i'}}).limit(10).exec((err,foundPosts) => {
    if(err) return err;
    res.send(foundPosts);
  });
});
module.exports = router;
