let express = require('express'),
    multer = require('multer'),
    mongoose = require('mongoose'),
    uuidv4 = require('uuid/v4');
const bodyParser = require('body-parser');
const upload2 = require('./multer')
const cloudinary = require('./cloudinary')
const fs = require('fs');
router = express.Router();
var Restaurant = require('../models/restaurant');

router.get('/', function(req, res, next) {
  Restaurant.find(function(err,data){
    res.json(data);
});

});
router.get("/:restoId", (req , res , next) =>{
  var id = req.params.restoId;
  Restaurant.findById(id , function(err, data){
    res.json(data); 
  });
});
router.get('/user/:userId', function(req, res, next) {
  var user =req.params.userId
  Restaurant.find({userId:user},function(err,data){
    res.json(data);
});

});
router.get('/user/count/:userId', function(req, res, next) {
  var user =req.params.userId
  Restaurant.countDocuments({userId:user},function(err,data){
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

/* GET home page. */



router.post('/', upload.single('image'),(req, res , next) =>{
  console.log(req.file);
    var restaurant = new Restaurant({
      _id: new mongoose.Types.ObjectId(),
      name: req.body.name ,
      address: req.body.address ,
      phoneNumber: req.body.phoneNumber ,
      description: req.body.description ,
      image : req.file.filename
    });
    restaurant.save().then(result =>{
      console.log(result);
    }).catch(err => console.log(err));

    res.status(201).json({
      message : "post image work",
      createdRest: restaurant
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


var restaurant = new Restaurant({
  _id: new mongoose.Types.ObjectId(),
  name: req.body.name ,
  address: req.body.address ,
  phoneNumber: req.body.phoneNumber ,
  description: req.body.description ,
  userId:req.body.user,
  details:req.body.details,

  imgCollection : justUrls
});
restaurant.save().then(result =>{
  console.log(result);
}).catch(err => console.log(err));

res.status(201).json({
  message : "post image work",
  createdRest: restaurant
});
})

router.patch("/:restaurantId",upload.single('image'), (req , res , next)=>{
  var id = req.params.restaurantId;
  Restaurant.findByIdAndUpdate(id ,{
    name: req.body.name ,
      address: req.body.address ,
      phoneNumber: req.body.phoneNumber ,
      description: req.body.description ,
      image : req.file.filename
   }).then(result => {
    console.log(result);
    res.status(200).json({
      message : "update restaurant work",
      result
    });
  }).catch(err => console.log(err));
});

router.get("/:restaurantId", (req , res , next) =>{
  var id = req.params.restaurantId;
  Restaurant.findById(id , function(err, data){
    res.json(data); 
  });
});

router.delete("/:restaurantId", (req , res , next)=>{
  var id = req.params.restaurantId;

  Restaurant.remove({_id : id}).then(result =>{
    console.log("delete ok ...");
  }).catch(err => console.log(err));

  res.status(200).json({
    message : "delete restaurant work"
  });
});


module.exports = router;