var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
const Booking = require('../models/bookingGuest');
var Accomodation = require('../models/accomodation');


router.get('/', function(req, res, next) {
    Booking.find(function(err,data){
      res.json(data);
  });
  
});
router.get('/user/:userId', function(req, res, next) {
  var userId=req.params.userId
  Booking.findOne({userId:userId},function(err,data){
    res.json(data);
});

});
router.get('/user/update/:userId', function(req, res, next) {
  var userId=req.params.userId
  Booking.findOneAndUpdate({userId:userId},{payment:true},function(err,data){
    res.json(data);
});

});
router.delete("/:id", (req , res , next)=>{
  var id = req.params.id;

  booking.remove({_id : id}).then(result =>{
    console.log("delete ok ...");
  }).catch(err => console.log(err));

  res.status(200).json({
    message : "Booking delete image work"
  });
});
router.post('/delete/accomodation/:userId/:accomodation',(req, res , next) =>{
  console.log(req);
  var userId = req.params.userId;
  var accomodation = req.params.accomodation;
  
  Accomodation.findById(accomodation , function(err, data){
    Booking.findOne({userId:userId}).exec(function(err,b){
      if(b){
        var e=b.accomodations.filter(x=>x.accomodationId==accomodation)[0];
        var index=b.accomodations.indexOf(e);
       b.accomodations.splice(index,1);



        
        
        b.save().then(result =>{
          console.log(result);
        }).catch(err => console.log(err));
        res.status(201).json({
          message : "deleted",
          createdAccomodation: b,
        });

      }
      else{
 
         
          res.status(500).json({
            message : err,
          });
           
    
      }
       
  });
  });
  

   
 


 

 


})
router.post('/update/accomodation/:userId/:accomodation',(req, res , next) =>{
  console.log(req);
  var userId = req.params.userId;
  var accomodation = req.params.accomodation;
  
  Accomodation.findById(accomodation , function(err, data){
    Booking.findOne({userId:userId,payment:false}).exec(function(err,b){
      if(b){
        var ev=b.accomodations.filter(x=>x.accomodationId==accomodation)[0];
        if(ev){
          b.accomodations.filter(x=>x.accomodationId==accomodation)[0].qte++
        }
        else {
          b.accomodations.push({
            name:data.name,
            img:data.imgCollection,
            qte:1,
            accomodationId:accomodation,
  
          });
        }



        
        
        b.save().then(result =>{
          console.log(result);
        }).catch(err => console.log(err));
        res.status(201).json({
          message : "updated",
          createdAccomodation: b,
        });

      }
      else{
 
          console.log("accomodationss "+data)
          if(data){
              var booking = new Booking({
                  _id: new mongoose.Types.ObjectId(),
                  userId: userId ,
                  payment:false,
                  accomodations:[{
                      accomodationId:accomodation,
                      name:data.name,
                      img:data.imgCollection,
                      price:20,
                      qte:1
                  }
                      
                  ] ,
            
                });
                booking.save().then(result =>{
                  console.log(result);
                }).catch(err => console.log(err));
                res.status(201).json({
                  message : "post image work",
                  createdAccomodation: booking
                });
  
          }
          else{
              console.log(err);
              res.status(500).json({
                  message : err,
                });
  
          }
           
    
      }
       
  });
  });
  

   
 


 

 


})

 router.post('/',(req, res , next) =>{
    console.log(req);
    var booking = new Booking({
      _id: new mongoose.Types.ObjectId(),
      userId: req.body.user ,
      accomodationId: req.body.accomodation ,

    });
    booking.save().then(result =>{
        console.log(result);
      }).catch(err => console.log(err));

      res.status(201).json({
        message : "post image work",
        createdAccomodation: booking
      });
  });
  
  router.post('/confirm/pay/:id/:mode',(req, res , next) =>{
    console.log(req);
    var id=req.params.id
    var mode=req.params.mode;
  
      Booking.findById(id).exec(function(err,ev){
        ev.payment=true;
        ev.mode=mode;
  
         ev.save().then(result =>{
                  console.log(result);
                }).catch(err => console.log(err));
              
                
      })
  
    res.status(201).json({
      message : "updated",
    });
   
  })
  router.get('/user/payment/:userId', function(req, res, next) {
    var userId=req.params.userId
    Booking.findOne({userId:userId,payment:false},function(err,data){
      res.json(data);
  });
  });

  router.post('/:accomodation/:user',(req, res , next) =>{
    console.log(req);
    var accomodation = req.params.accomodation;
    var user = req.params.user;
    Accomodation.findById({_id:accomodation}).exec(function(err,ev){
        console.log("accomodationss "+ev)
        if(ev){
            var booking = new Booking({
                _id: new mongoose.Types.ObjectId(),
                userId: user ,
                payment:false,
                accomodations:[{
                    accomodationId:accomodation,
                    name:ev.name,
                    img:ev.imgCollection,
                    price:ev.price,
                    qte:1
                }
                    
                ] ,
          
              });
              booking.save().then(result =>{
                console.log(result);
              }).catch(err => console.log(err));
              res.status(201).json({
                message : "post image work",
                createdAccomodation: booking
              });

        }
        else{
            console.log(err);
            res.status(500).json({
                message : err,
              });

        }
         
    });

   
  

})
router.post('/update/:id/:accomodation/:qte',(req, res , next) =>{
    console.log(req);
    var id = req.params.id;
    var qte = req.params.qte;
    var accomodation = req.params.accomodation;
   



      Booking.findById({_id:id}).exec(function(err,b){
        if(b){
           b.accomodations.filter(x=>x.accomodationId=accomodation)[0].qte=qte;
              b.save().then(result =>{
                console.log(result);
              }).catch(err => console.log(err));
              res.status(201).json({
                message : "updated",
                createdAccomodation: b
              });

        }
        else{
            console.log(err);
            res.status(500).json({
                message : err,
              });

        }
         
    });
   


   

   
  

})


  /*Booking.findById({_id:id}).exec(function(err,b){
      console.log("eventss "+ev)
      if(b){
         b.events.filter(x=>x.eventId=event)[0].qte=qte;
            b.save().then(result =>{
              console.log(result);
            }).catch(err => console.log(err));
            res.status(201).json({
              message : "updated",
              createdAccomodation: b
            });

      }
      else{
          console.log(err);
          res.status(500).json({
              message : err,
            });

      }*/
       
  //});

 





  router.get("/:id", (req , res , next) =>{
    var id = req.params.id;
    Booking.findById(id , function(err, data){
      res.json(data); 
    });
  });
  router.get("/user/:id", (req , res , next) =>{
    var id = req.params.id;
    Booking.find({userId:id} , function(err, data){
      res.json(data); 
    });
  });

  router.delete("/:id", (req , res , next)=>{
    var id = req.params.id;

    Booking.remove({_id : id}).then(result =>{
      console.log("delete ok ...");
    }).catch(err => console.log(err));

    res.status(200).json({
      message : "Accomodation delete image work"
    });
  });

 

  module.exports = router;