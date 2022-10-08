var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Contact = require('../models/contact');


router.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

router.get('/', function(req, res, next) {
    Contact.find(function(err,data){
      res.json(data); 
    });
    
  });

  router.post('/', (req, res , next) => {
    console.log(req);
      var contact = new Contact({
        _id: new mongoose.Types.ObjectId(),
        firstName: req.body.firstName ,
        lastName: req.body.lastName ,
        mail: req.body.mail ,
        message: req.body.message 
      });

      contact.save().then(result =>{
        console.log(result);
      }).catch(err => console.log(err));
  
      res.json(contact);
  });

  router.get("/:contactId", (req , res , next) =>{
    var id = req.params.contactId;
    Contact.findById(id , function(err, data){
      res.status(200).json({
        message: ' contact methode get by id work',
        data
    }); 
    });
  });
  
  router.delete("/:contactId", (req , res , next)=>{
    var id = req.params.contactId;
  
    Contact.remove({_id : id}).then(result =>{
      console.log("delete ok ...");
    }).catch(err => console.log(err));
  
    res.status(200).json({
      message : "contact delete image work"
    });
  });
  
  
  module.exports = router;
  