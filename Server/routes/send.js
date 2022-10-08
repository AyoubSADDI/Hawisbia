const express = require('express');
const nodemailer = require("nodemailer");
require("dotenv").config();

router = express.Router();


let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL || 'brahim.hmida1@esprit.tn', // TODO: your gmail account
        pass: process.env.PASSWORD || '11375059' // TODO: your gmail password
    }
});
       
       router.post("/", function (req, res) {
        let mailOptions = {
          from: "brahim.hmida1@esprit.tn",
          to: "brahimhm470@gmail.com",
          subject: "Nodemailer API",
          text: "Hi from your nodemailer API",
        };
       
        transporter.sendMail(mailOptions, function (err, data) {
          if (err) {
            console.log("Error " + err);
          } else {
            console.log("Email sent successfully");
            res.json({ status: "Email sent" });
          }
        });
       });

       module.exports = router;