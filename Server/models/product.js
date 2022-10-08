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
const productSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    price : Number,
    desc : String,
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    imgCollection: {
        type: Array
    },
    comments: [commentSchema]

});

module.exports = mongoose.model('Product', productSchema);