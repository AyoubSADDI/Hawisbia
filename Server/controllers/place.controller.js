const Place = require('../models/place');

exports.placesController = (req,res)=>{
    Place.find(function(err,data){
        res.status(200).json({
          message: 'contact get methode work',
          data
      }); 
    })
};

exports.placeController = (req, res) => {
    const placeId = req.params.id;
    Place.findById(placeId).exec((err, place) => {
        if (err || !place) {
            return res.status(400).json({
                error: 'place not found'
            });
        }
      
        res.json(place);
    });
};
exports.addPlaceController = (req, res) => {
    const { name, description, lat,long } = req.body;
    const errors = validationResult(req);
  
    if (!errors.isEmpty()) {
      const firstError = errors.array().map(error => error.msg)[0];
      return res.status(422).json({
        errors: firstError
      });
    } else {
      place.findOne({
        name
      }).exec((err, place) => {
        if (place) {
          return res.status(400).json({
            errors: 'Name is taken'
          });
        }
      });
      const place = new place({
        name,
        description,
        lat,
        long
      });
      place.save((err, place) => {
        if (err) {
          console.log('Save error', errorHandler(err));
          return res.status(401).json({
            errors: errorHandler(err)
          });
        } else {
          return res.json({
            success: true,
            message: place,
            message: 'Signup success'
          });
        }
      });
  
      

    }
  };
exports.updatePlaceController = (req, res) => {
    
    // console.log('UPDATE place - req.place', req.place, 'UPDATE DATA', req.body);
    const { name, description } = req.body;

    Place.findOne({ _id: req.place._id }, (err, place) => {
        if (err || !place) {
            return res.status(400).json({
                error: 'place not found'
            });
        }
       

     
        place.name=name;
        place.description=description;
      
        place.save((err, updatedPlace) => {
            if (err) {
                console.log('place UPDATE ERROR', err);
                return res.status(400).json({
                    error: 'Place update failed'
                });
            }
            res.json(updatedPlace);
        });
    });
};


exports.placeDeleteController=(req,res)=>{
  
      
        Contact.remove({_id : req.place._id}).then(result =>{
          console.log("delete ok ...");
        }).catch(err => console.log(err));
      
        res.status(200).json({
          message : "place delete image work"
        });

}