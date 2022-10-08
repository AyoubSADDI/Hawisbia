var multer = require('multer');
var express = require('express');
var router = express.Router();
var User = require('../models/auth.model');
var mongoose = require('mongoose');

router.get('/', function(req, res, next) {
    User.find(function(err,data){
        res.json(data); 
    });
    
  });

  module.exports = router;