const circuit = require('../models/circuit');

exports.circuitsController = (req,res)=>{
    circuit.find(function(err,data){
        res.status(200).json({
          message: 'contact get methode work',
          data
      }); 
    })
};

exports.circuitController = (req, res) => {
    const circuitId = req.params.id;
    circuit.findById(circuitId).exec((err, circuit) => {
        if (err || !circuit) {
            return res.status(400).json({
                error: 'User not found'
            });
        }
      
        res.json(circuit);
    });
};
exports.addcircuitController = (req, res) => {
    const { name, description, places } = req.body;
    const errors = validationResult(req);
  
    if (!errors.isEmpty()) {
      const firstError = errors.array().map(error => error.msg)[0];
      return res.status(422).json({
        errors: firstError
      });
    } else {
      circuit.findOne({
        name
      }).exec((err, circuit) => {
        if (circuit) {
          return res.status(400).json({
            errors: 'Name is taken'
          });
        }
      });
      const circuit = new circuit({
        name,
        description,
        places
      });
      circuit.save((err, circuit) => {
        if (err) {
          console.log('Save error', errorHandler(err));
          return res.status(401).json({
            errors: errorHandler(err)
          });
        } else {
          return res.json({
            success: true,
            message: circuit,
            message: 'Signup success'
          });
        }
      });
  
      

    }
  };
exports.updatecircuitController = (req, res) => {
    
    // console.log('UPDATE USER - req.user', req.user, 'UPDATE DATA', req.body);
    const { name, description } = req.body;

    circuit.findOne({ _id: req.user._id }, (err, circuit) => {
        if (err || !circuit) {
            return res.status(400).json({
                error: 'User not found'
            });
        }
       

     
        circuit.name=name;
        circuit.description=description;
      
        circuit.save((err, updatedcircuit) => {
            if (err) {
                console.log('USER UPDATE ERROR', err);
                return res.status(400).json({
                    error: 'circuit update failed'
                });
            }
            res.json(updatedcircuit);
        });
    });
};


exports.circuitDeleteController=(req,res)=>{
  
      
        Contact.remove({_id : req.circuit._id}).then(result =>{
          console.log("delete ok ...");
        }).catch(err => console.log(err));
      
        res.status(200).json({
          message : "circuit delete image work"
        });

}