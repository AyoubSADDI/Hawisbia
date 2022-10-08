let express = require('express'),
    multer = require('multer'),
    mongoose = require('mongoose'),
    uuidv4 = require('uuid/v4');
const bodyParser = require('body-parser');
const upload2 = require('./multer')
const cloudinary = require('./cloudinary')
const fs = require('fs');
router = express.Router();
var Maison = require('../models/maison');


router.get('/', function(req, res, next) {
  Maison.find(function(err,data){
    res.json(data);
  });
  
});
router.get('/user/:userId', function(req, res, next) {
  var user =req.params.userId
  Maison.find({userId:user},function(err,data){
    res.json(data);
});

});

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


  router.post('/', upload.single('image'),(req, res , next) =>{
   // console.log(req.file);
    var maison = new Maison({
      _id: new mongoose.Types.ObjectId(),
      nameMaison: req.body.nameMaison ,
      descriptionMaison: req.body.descriptionMaison ,
      pricesMaison: req.body.pricesMaison ,
      phoneMaison: req.body.phoneMaison,
      adressMaison: req.body.adressMaison,
      image:req.file.filename,
    });
    maison.save().then(result =>{
        console.log(result);
      }).catch(err => console.log(err));
  
      res.status(201).json({
        message : "post image work",
        createdProduct: maison
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
  
    var maison = new Maison({
      _id: new mongoose.Types.ObjectId(),
      nameMaison: req.body.nameMaison ,
      descriptionMaison: req.body.descriptionMaison ,
      pricesMaison: req.body.pricesMaison ,
      phoneMaison: req.body.phoneMaison,
      userId:req.body.user,
      details:req.body.details,
      adressMaison: req.body.adressMaison,
      img:justUrls,
    });
    maison.save().then(result =>{
        console.log(result);
      }).catch(err => console.log(err));
  
      res.status(201).json({
        message : "post image work",
        createdProduct: maison
      });
  })

  router.get("/:maisonId", (req , res , next) =>{
    var id = req.params.maisonId;
    Maison.findById(id , function(err, data){
      res.json(data); 
    });
  });

  router.delete("/:maisonId", (req , res , next)=>{
    var id = req.params.maisonId;
  
    Maison.remove({_id : id}).then(result =>{
      console.log("delete ok ...");
    }).catch(err => console.log(err));
  
    res.status(200).json({
      message : "Maison delete image work"
    });
  });
  
  router.patch("/:maisonId",upload.single('image'), (req , res , next)=>{
    var id = req.params.maisonId;
   // console.log(req.body);
   // console.log(req.file.filename);
    Maison.findByIdAndUpdate(id , {
      nameMaison: req.body.nameMaison ,
      descriptionMaison: req.body.descriptionMaison ,
      pricesMaison: req.body.pricesMaison ,
      phoneMaison: req.body.phoneMaison,
      adressMaison: req.body.adressMaison,
      image:req.file.filename,
       }).then(result => {
      console.log(result);
      res.status(200).json({
        message : "update image work",
        result
      });
    }).catch(err => console.log(err));
  });
  
  module.exports = router;
