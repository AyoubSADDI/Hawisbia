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
const accomodationSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    desc: String,
    details: String,

    prices: Number,
    imgCollection: {
        type: Array
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    phone: Number,
    type: String,
    adress: String,
    comments: [commentSchema]

});

module.exports = mongoose.model('Accomodation', accomodationSchema);
