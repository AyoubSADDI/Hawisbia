var mongoose = require('mongoose');
 require('mongoose-double')(mongoose);

const Float = require('mongoose-float').loadType(mongoose);

const Schema=mongoose.Schema;
const commentSchema=new Schema({
    
    comment:{
        type:String,
        required:true,

    },
    created_at: {type: Date, required: true, default: Date.now() },
    updated_at: {type: Date, required: true, default: Date.now() },
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
    
},
{
    timestamps:true
})

const placeSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    namePlace: String,
    descriptionPlace: String,
    lanPlace: { type: mongoose.Schema.Types.Double },
    longPlace: { type: mongoose.Schema.Types.Double },
    image: String,
    imgCollection: {
        type: Array
    },
    audios: {
        type: Array
    },
    circuits: {
        type: Array
    },
    videos: {
        type: Array
    },
    comments: [commentSchema]

  
});

module.exports = mongoose.model('Place', placeSchema);