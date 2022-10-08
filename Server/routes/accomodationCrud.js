let express = require('express'),
    multer = require('multer'),
    mongoose = require('mongoose'),
    uuidv4 = require('uuid/v4');
const bodyParser = require('body-parser');
const upload2 = require('./multer')
const cloudinary = require('./cloudinary')
const fs = require('fs');
router = express.Router();
var Accomodation = require('../models/accomodation');

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
    Accomodation.find(function(err,data){
      res.json(data);
    });

  });

  router.get('/user/:userId', function(req, res, next) {
    var user =req.params.userId
    Accomodation.find({userId:user},function(err,data){
      res.json(data);
  });
  
  });
  router.get("/:guestId", (req , res , next) =>{
    var id = req.params.guestId;
    Accomodation.findById(id , function(err, data){
      res.json(data); 
    });
  });
  router.get('/user/count/:userId', function(req, res, next) {
    var user =req.params.userId
    Accomodation.countDocuments({userId:user},function(err,data){
      res.json(data);
  });
  
  });

  router.post('/', upload.single('image'),(req, res , next) =>{
    console.log(req.file);
    var accomodation = new Accomodation({
      _id: new mongoose.Types.ObjectId(),
      name: req.body.name ,
      desc: req.body.desc ,
      prices: req.body.prices ,
      image:req.file.filename,
      phone: req.body.phone ,
      type: req.body.type ,
      userId:req.body.user,

      adress: req.body.adress ,
      comments: req.body.comments ,


    });
    accomodation.save().then(result =>{
        console.log(result);
      }).catch(err => console.log(err));

      res.status(201).json({
        message : "post image work",
        createdAccomodation: accomodation
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
  

      var accomodation = new Accomodation({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name ,
        desc: req.body.desc ,
        price: req.body.price ,
        imgCollection:justUrls,
        phone: req.body.phone ,
        type: req.body.type ,
        adress: req.body.adress ,
        userId:req.body.user,
        details:req.body.details,
  
  
      });
      accomodation.save().then(result =>{
          console.log(result);
        }).catch(err => console.log(err));
  
        res.status(201).json({
          message : "post image work",
          createdAccomodation: accomodation
        });
  })

  router.get("/:accomodationId", (req , res , next) =>{
    var id = req.params.accomodationId;
    Accomodation.findById(id , function(err, data){
      res.json(data); 
    });
  });

  router.delete("/:accomodationId", (req , res , next)=>{
    var id = req.params.accomodationId;

    Accomodation.remove({_id : id}).then(result =>{
      console.log("delete ok ...");
    }).catch(err => console.log(err));

    res.status(200).json({
      message : "Accomodation delete image work"
    });
  });

  router.patch("/:accomodationId",upload.single('image'), (req , res , next)=>{
    var id = req.params.accomodationId;
    console.log(req.body);
    console.log(req.file.filename);
    Accomodation.findByIdAndUpdate(id , {
      name : req.body.name,
      desc: req.body.desc,
      prices: req.body.prices ,
      image:req.file.filename,
      phone: req.body.phone ,
      type: req.body.type ,
      adress: req.body.adress ,
      comments: req.body.comments ,
       }).then(result => {
      console.log(result);
      res.status(200).json({
        message : "update image work",
        result
      });
    }).catch(err => console.log(err));
  });

  module.exports = router;