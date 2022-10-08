let express = require('express'),
    multer = require('multer'),
    mongoose = require('mongoose'),
    uuidv4 = require('uuid/v4');
const bodyParser = require('body-parser');
const upload2 = require('./multer')
const cloudinary = require('./cloudinary')
const fs = require('fs');
router = express.Router();
var Jeux = require('../models/Jeux');


var storage = multer.diskStorage({
  destination: function(req , file , cb){
    cb(null , '../black-dashboard-react/public/uploads');

  },
  filename : function(req , file , cb){
    cb(null , file.originalname);
  }
});

var fileFilter = (req , file , cb)=>{
  if ( file.mimetype === 'image/jpeg' || file.mimetype === 'image/png')
  {
    cb(null, true);
  }else{
    cb(new Error('invalid type of image'), false);
  }
}
var upload = multer(
  {storage : storage},
  {fileFilter: fileFilter}
  );

  router.get('/', function(req, res, next) {
    Jeux.find(function(err,data){
      res.json(data);
    });
    
  });
  router.get("/:jeuId", (req , res , next) =>{
    var id = req.params.jeuId;
    Jeux.findById(id , function(err, data){
      res.json(data); 
    });
  });
  router.get('/user/:userId', function(req, res, next) {
    var user =req.params.userId
    Jeux.find({userId:user},function(err,data){
      res.json(data);
  });
  
  });

  router.post('/', upload.single('image'),(req, res , next) =>{
    console.log(req.file);
      var jeux = new Jeux({
        _id: new mongoose.Types.ObjectId(),
        nameJeux: req.body.nameJeux ,
        descriptionJeux: req.body.descriptionJeux ,
        prixJeux: req.body.prixJeux ,
        image : req.file.filename,
      });
      jeux.save().then(result =>{
        console.log(result);
      }).catch(err => console.log(err));
  
      res.status(201).json({
        message : "post image work",
        createdJeux: jeux
      });
  });
  
router.post('/upload-images', upload2.array('imgCollection', 6), async (req, res, next) => {
  const reqFiles = [];
  const myFiles=[];
  //const url = req.protocol + '://' + req.get('host')
  for (var i = 0; i < req.files.length; i++) {
      reqFiles.push(req.files[i].filename)
      myFiles.push(req.files[i].filename)
  }
  const uploader = async (path) => await cloudinary.uploads(path, 'Images');

  const urls = []
  const files = req.files;
  for (const file of files) {
    const { path } = file;
    const newPath = await uploader(path)
    console.log("aaaaaaa");
    console.log(newPath);
    urls.push(newPath);
    fs.unlinkSync(path)
  }
  const justUrls=[]
  for (url of urls){
    justUrls.push(url.url);
  }
  console.log(justUrls);

  var jeux = new Jeux({
    _id: new mongoose.Types.ObjectId(),
    nameJeux: req.body.nameJeux ,
    userId:req.body.user,
    descriptionJeux: req.body.descriptionJeux ,
    prixJeux: req.body.prixJeux ,
    userId:req.body.user,
    details:req.body.details,
    imgCollection : justUrls,
  });
  jeux.save().then(result =>{
    console.log(result);
  }).catch(err => console.log(err));

  res.status(201).json({
    message : "post image work",
    createdJeux: jeux
  });
})

  router.patch("/:jeuxId",upload.single('image'), (req , res , next)=>{
    var id = req.params.jeuxId;
    console.log(req.body);
    console.log(req.file.filename);
    Jeux.findByIdAndUpdate(id , {
        nameJeux: req.body.nameJeux ,
        descriptionJeux: req.body.descriptionJeux ,
        prixJeux: req.body.prixJeux ,
        image : req.file.filename,
       }).then(result => {
      console.log(result);
      res.status(200).json({
        message : "update image work",
        result
      });
    }).catch(err => console.log(err));
  });
  
  router.get("/:jeuxId", (req , res , next) =>{
    var id = req.params.jeuxId;
    Jeux.findById(id , function(err, data){
      res.json(data); 
    });
  });
  
  router.delete("/:jeuxId", (req , res , next)=>{
    var id = req.params.jeuxId;
  
    Jeux.remove({_id : id}).then(result =>{
      console.log("delete ok ...");
    }).catch(err => console.log(err));
  
    res.status(200).json({
      message : "delete image work"
    });
  });
  
  
  module.exports = router;
  
