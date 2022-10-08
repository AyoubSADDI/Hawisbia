var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
const Booking = require('../models/bookingProd');
var Product = require('../models/product');


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
router.post('/delete/product/:userId/:product',(req, res , next) =>{
  console.log(req);
  var userId = req.params.userId;
  var product = req.params.product;
  
  Product.findById(product , function(err, data){
    Booking.findOne({userId:userId}).exec(function(err,b){
      if(b){
        var e=b.products.filter(x=>x.productId==product)[0];
        var index=b.products.indexOf(e);
       b.products.splice(index,1);



        
        
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
router.post('/update/product/:userId/:product',(req, res , next) =>{
  console.log(req);
  var userId = req.params.userId;
  var product = req.params.product;
  
  Product.findById(product , function(err, data){
    Booking.findOne({userId:userId,payment:false}).exec(function(err,b){
      if(b){
        var ev=b.products.filter(x=>x.productId==product)[0];
        if(ev){
          b.products.filter(x=>x.productId==product)[0].qte++
        }
        else {
          b.products.push({
            name:data.name,
            img:data.imgCollection,
            qte:1,
            productId:product,
  
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
 
          console.log("productss "+data)
          if(data){
              var booking = new Booking({
                  _id: new mongoose.Types.ObjectId(),
                  userId: userId ,
                  payment:false,
                  products:[{
                      productId:product,
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
      productId: req.body.product ,

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
    var id=req.params.id;
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

  router.post('/:product/:user',(req, res , next) =>{
    console.log(req);
    var product = req.params.product;
    var user = req.params.user;
    Product.findById({_id:product}).exec(function(err,ev){
        console.log("productss "+ev)
        if(ev){
            var booking = new Booking({
                _id: new mongoose.Types.ObjectId(),
                userId: user ,
                payment:false,
                products:[{
                    productId:product,
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
router.post('/update/:id/:product/:qte',(req, res , next) =>{
    console.log(req);
    var id = req.params.id;
    var qte = req.params.qte;
    var product = req.params.product;
   



      Booking.findById({_id:id}).exec(function(err,b){
        if(b){
           b.products.filter(x=>x.productId=product)[0].qte=qte;
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