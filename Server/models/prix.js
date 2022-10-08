const mongoose = require('mongoose');
const Float = require('mongoose-float').loadType(mongoose);

const prixSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,

    name: String,
    price: { type: Float },

  
});

module.exports = mongoose.model('Prix', prixSchema);