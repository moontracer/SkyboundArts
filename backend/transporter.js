let nodemailer = require('nodemailer');
const config = require('./config.js');
const express = require('express');
const app = express()
const port = 4000
// app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`App listening on port ${port}`))

var transport = {
    host: 'smtp.gmail.com',
    auth: {
        user: config.USER,
        pass: config.PASS
    }
}

var transporter = nodemailer.createTransport(transport);

transporter.verify((error, success) => {
    if (error){
        console.log(error);
    }
    else {
        console.log("Server loaded without error");
    }
})