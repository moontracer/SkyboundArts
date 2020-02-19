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




/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
