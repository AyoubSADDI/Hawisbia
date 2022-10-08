var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
const Booking = require('../models/bookingResto');
var Restaurant = require('../models/restaurant');


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
router.get('/user/payment/:userId', function(req, res, next) {
  var userId=req.params.userId
  Booking.findOne({userId:userId,payment:false},function(err,data){
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
router.post('/delete/resto/:userId/:resto',(req, res , next) =>{
  console.log(req);
  var userId = req.params.userId;
  var resto = req.params.resto;
  
  Restaurant.findById(resto , function(err, data){
    Booking.findOne({userId:userId}).exec(function(err,b){
      if(b){
        var e=b.restos.filter(x=>x.restoId==resto)[0];
        var index=b.restos.indexOf(e);
       b.restos.splice(index,1);



        
        
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
router.post('/update/resto/:userId/:resto',(req, res , next) =>{
  console.log(req);
  var userId = req.params.userId;
  var resto = req.params.resto;
  
  Restaurant.findById(resto , function(err, data){
    Booking.findOne({userId:userId,payment:false}).exec(function(err,b){
      if(b){
        var ev=b.restos.filter(x=>x.restoId==resto)[0];
        if(ev){
          b.restos.filter(x=>x.restoId==resto)[0].qte++
        }
        else {
          b.restos.push({
            name:data.name,
            img:data.imgCollection,
            qte:1,
            restoId:resto,
  
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
 
          console.log("restoss "+data)
          if(data){
              var booking = new Booking({
                  _id: new mongoose.Types.ObjectId(),
                  userId: userId ,
                  payment:false,
                  restos:[{
                      restoId:resto,
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
      restoId: req.body.resto ,

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

  router.post('/:resto/:user',(req, res , next) =>{
    console.log(req);
    var resto = req.params.resto;
    var user = req.params.user;
    Restaurant.findById({_id:resto}).exec(function(err,ev){
        console.log("restoss "+ev)
        if(ev){
            var booking = new Booking({
                _id: new mongoose.Types.ObjectId(),
                userId: user ,
                payment:false,
                restos:[{
                    restoId:resto,
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
router.post('/update/:id/:resto/:qte',(req, res , next) =>{
    console.log(req);
    var id = req.params.id;
    var qte = req.params.qte;
    var resto = req.params.resto;
   



      Booking.findById({_id:id}).exec(function(err,b){
        if(b){
           b.restos.filter(x=>x.restoId=resto)[0].qte=qte;
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