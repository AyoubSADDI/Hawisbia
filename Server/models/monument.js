var mongoose = require('mongoose');
 require('mongoose-double')(mongoose);

const Float = require('mongoose-float').loadType(mongoose);

const Schema=mongoose.Schema;


const monumentSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    desc: String,
    details:String,
    address:String,
    placeId: {
        type: Schema.Types.ObjectId,
        ref: 'Place',
    },
    imgCollection: {
        type: Array
    },
    audios: {
        type: Array
    },

    videos: {
        type: Array
    },

  
});

module.exports = mongoose.model('Monument', monumentSchema);