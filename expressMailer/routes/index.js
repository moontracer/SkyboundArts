var express = require('express');
var router = express.Router();
const nodemailer = require('nodemailer');
const config = require('../config/config.js');

let transport = {
  host: 'smtp.gmail.com',
  auth: {
    user: config.USER,
    pass: config.PASS
  }
};

let transporter = nodemailer.createTransport(transport);

transporter.verify(function(error, success){
  if (error){
    console.log(error);
  }
  else {
    console.log("Server is ready to take our messages");
  }
})

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// Posting message
router.post('/send', function(req, res, next){
  var name = req.body.name;
  var email = req.body.email;
  var message = req.body.message;
  var content = `Name: ${name} \nEmail: ${email} \nMessage: ${message}`
  var message = {
    from: name,
    to: 'benji@skyboundarts.com',
    subject: 'Skybound Support Message',
    text: content
  }
  transporter.sendMail(message, function(err, response){
    if (err){
      res.json({
        msg: 'fail'
      })
    }
    else {
      res.json({msg: 'success'})
    }
  })
})

module.exports = router;
