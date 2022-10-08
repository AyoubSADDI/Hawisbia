const mongoose = require('mongoose');

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
const maisonSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    nameMaison: String,
    descriptionMaison: String,
    pricesMaison: Number,
    details: String,

    imgCollection: {
        type: Array
    },
    phoneMaison: Number,
    adressMaison: String,
    comments: [commentSchema]

});

module.exports = mongoose.model('Maison', maisonSchema);