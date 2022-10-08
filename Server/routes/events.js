let express = require('express'),
    multer = require('multer'),
    mongoose = require('mongoose'),
    uuidv4 = require('uuid/v4');
const bodyParser = require('body-parser');
const upload2 = require('./multer')
const cloudinary = require('./cloudinary')
const fs = require('fs');
router = express.Router();

var Event = require('../models/event');
const DIR = './public/';



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

  
const storage1 = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null , '../black-dashboard-react/public/uploads/events');

  },
  filename: (req, file, cb) => {
      const fileName = file.originalname.toLowerCase().split(' ').join('-');
      cb(null, uuidv4() + '-' + fileName)
  }
});

var upload1 = multer({
  storage: storage1,
  fileFilter: (req, file, cb) => {
      if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
          cb(null, true);
      } else {
          cb(null, false);
          return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
      }
  }
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

  var event = new Event({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name ,
    placesNembre: req.body.placesNembre ,
    startDate: req.body.startDate ,
    endDate: req.body.endDate ,
    desc: req.body.desc ,
    userId:req.body.user,
    details:req.body.details,
    imgCollection: justUrls
  });
  console.log(event);

  event.save().then(result => {
    res.status(200).json({
      message: 'images uploaded successfully',
      data: urls
    })
  }).catch(err => {
      console.log(err),
          res.status(500).json({
              error: err
          });
  })
})

/* GET home page. */
router.get('/', function(req, res, next) {
    Event.find(function(err,data){
      res.json(data);
  });
  
});

router.post('/comments', function(req, res, next) {
  var user=req.body.userId;
  var event=req.body.eventId;
  var img=req.body.img;
  var name=req.body.name;
  var content=req.body.content;
  var d={
    userId:user,
    name:name,
    img:img,
    content:content

  }
  Event.findByIdAndUpdate(event, { $push: { comments: d  } },
    function (error, success) {
          if (error) {
              console.log(error);
              res.json(error)
          } else {
              console.log(success);
              res.json(success);
          }
      });

});




router.get('/user/:userId', function(req, res, next) {
  var user =req.params.userId
  Event.find({userId:user},function(err,data){
    res.json(data);
});

});

router.get('/user/count/:userId', function(req, res, next) {
  var user =req.params.userId
  Event.countDocuments({userId:user},function(err,data){
    res.json(data);
});

});
router.post('/favoris/:userId/:eventId', function(req, res, next) {
  var user =req.params.userId
  var event=req.params.eventId
  Event.findByIdAndUpdate(event, { $push: { favoris: user  } },
    function (error, success) {
          if (error) {
              console.log(error);
              res.json(error)
          } else {
              console.log(success);
              res.json(success);
          }
      });

});

router.post('/favoris/delete/:userId/:eventId', function(req, res, next) {
  var user =req.params.userId
  var event=req.params.eventId
  Event.findByIdAndUpdate(event, { $pull: { favoris: user  } },
    function (error, success) {
          if (error) {
              console.log(error);
              res.json(error)
          } else {
              console.log(success);
              res.json(success);
          }
      });

});

router.post('/', upload.single('image'),(req, res , next) =>{
  console.log(req.file);
    var event = new Event({
      _id: new mongoose.Types.ObjectId(),
      name: req.body.name ,
      placesNembre: req.body.placesNembre ,
      startDate: req.body.startDate ,
      endDate: req.body.endDate ,
      desc: req.body.desc ,
      image : req.file.filename
    });
    event.save().then(result =>{
      console.log(result);
    }).catch(err => console.log(err));

    res.status(201).json({
      message : "post image work",
      createdEvent: event
    });
});

router.patch("/:eventId",upload.single('image'), (req , res , next)=>{
  var id = req.params.eventId;
  Event.findByIdAndUpdate(id ,{
    name : req.body.name,
    placesNembre: req.body.placesNembre,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    desc : req.body.desc,
    image : req.file.filename
   }).then(result => {
    console.log(result);
    res.status(200).json({
      message : "update image work",
      result
    });
  }).catch(err => console.log(err));
});

router.get("/:eventId", (req , res , next) =>{
  var id = req.params.eventId;
  Event.findById(id , function(err, data){
    res.json(data); 
  });
});

router.delete("/:eventId", (req , res , next)=>{
  var id = req.params.eventId;

  Event.remove({_id : id}).then(result =>{
    console.log("delete ok ...");
  }).catch(err => console.log(err));

  res.status(200).json({
    message : "delete image work"
  });
});


module.exports = router;
