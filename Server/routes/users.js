var express = require('express');
var router = express.Router();
const User = require('../models/auth.model');

/* GET users listing. */
router.get('/', function(req, res, next) {
  User.find(function(err,data){
    res.status(200).json({
      message: 'User get methode work',
      data
  }); 
  });
  
});

module.exports = router;
