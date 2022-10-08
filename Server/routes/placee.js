let express = require('express'),
    multer = require('multer'),
    mongoose = require('mongoose'),
    uuidv4 = require('uuid/v4');
const bodyParser = require('body-parser');
const upload2 = require('./multer')
const cloudinary = require('./cloudinary')


const fs = require('fs');
router = express.Router();

var Place = require('../models/place');

router.get('/', function(req, res, next) {
  Place.find(function(err,data){
    res.json(data);
});

});
router.get('/circuit/:circuit', function(req, res, next) {
  var circuit = req.params.circuit;

  Place.find({ circuits: circuit },function(err,data){
    res.json(data);
});

});
router.post('/circuit/:place', function(req, res, next) {
  var place = req.params.place;
  console.log(req.body.name)
      Place.findByIdAndUpdate(place , 
    { $addToSet: { circuits: [req.body.name] } }, function(err, result) {
      if (err) {
        res.send(err);
      } else {
        res.send(result);
      }
    }

   ).then(result => {
  res.json(data); 

});
})

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
    cb(null , '../black-dashboard-react/public/uploads/places');

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
  
  
    var place = new Place({
      _id: new mongoose.Types.ObjectId(),
      namePlace: req.body.namePlace ,
      descriptionPlace: req.body.descriptionPlace ,
      lanPlace: req.body.lanPlace ,
      longPlace: req.body.longPlace,
      imgCollection:justUrls,
    });
    console.log(place);
  
    place.save().then(result => {
        res.status(201).json({
            message: "Done upload!",
            userCreated: {
                _id: result._id,
                imgCollection: result.imgCollection
            }
        })
    }).catch(err => {
        console.log(err),
            res.status(500).json({
                error: err
            });
    })
  })
  router.post('/upload-audio/:id', upload2.array('audio'), async (req, res) => {

    var id = req.params.id;

    const uploader = async (path) => await cloudinary.uploads(path, 'audio');
  
    if (req.method === 'POST') {
      const urls = []
      const files = req.files;
      for (const file of files) {
        const { path } = file;
        const newPath = await uploader(path)
        urls.push(newPath)
        fs.unlinkSync(path)
      }
      const justUrls=[]
      for (url of urls){
        justUrls.push(url.url);
      }
      Place.findByIdAndUpdate(id , {
        audios:justUrls
       }).then(result => {
      console.log(result);
      res.json(data); 
    
    }).catch(err => console.log(err));
  
      res.status(200).json({
        message: 'audio uploaded successfully',
        data: urls
      })
  
    } else {
      res.status(405).json({
        err: `${req.method} method not allowed`
      })
    }
  })
  router.post('/upload-video/:id', upload2.array('video'), async (req, res) => {

    var id = req.params.id;

    const uploader = async (path) => await cloudinary.uploads(path, 'video');
  
    if (req.method === 'POST') {
      const urls = []
      const files = req.files;
      for (const file of files) {
        const { path } = file;
        const newPath = await uploader(path)
        urls.push(newPath)
        fs.unlinkSync(path)
      }
      const justUrls=[]
      for (url of urls){
        justUrls.push(url.url);
      }
      Place.findByIdAndUpdate(id , {
        videos:justUrls
       }).then(result => {
      console.log(result);
      res.json(data); 
    
    }).catch(err => console.log(err));
  
      res.status(200).json({
        message: 'audio uploaded successfully',
        data: urls
      })
  
    } else {
      res.status(405).json({
        err: `${req.method} method not allowed`
      })
    }
  })
  router.get("/:placeId", (req , res , next) =>{
    var id = req.params.placeId;
    Place.findById(id , function(err, data){
      res.json(data); 
    });
  });
  router.delete("/:placeId", (req , res , next)=>{
    var id = req.params.placeId;
  
    Place.remove({_id : id}).then(result =>{
      console.log("delete ok ...");
    }).catch(err => console.log(err));
  
    res.json(data);
  });
  
  router.patch("/:placeId",upload.single('image'), (req , res , next)=>{
    var id = req.params.placeId;
    //console.log(req.body);
    //console.log(req.file.filename);
    Place.findByIdAndUpdate(id , {
        namePlace: req.body.namePlace ,
        descriptionPlace: req.body.descriptionPlace ,
        lanPlace: req.body.lanPlace ,
        longPlace: req.body.longPlace,
        image:req.file.filename,
       }).then(result => {
      console.log(result);
      res.json(data); 
    
    }).catch(err => console.log(err));
  });
  
  module.exports = router;
