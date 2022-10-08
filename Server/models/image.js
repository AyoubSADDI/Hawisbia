const mongoose = require('mongoose');

const imageSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    slide:{type: Boolean , default: false},
    myImage: { type : String , required : true}
});

module.exports = mongoose.model('Image', imageSchema)