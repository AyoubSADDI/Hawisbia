const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookingRestoSchema = new Schema(
    {
        _id: mongoose.Schema.Types.ObjectId,
        restos: [{
            restoId: {
                type: Schema.Types.ObjectId,
                ref: 'Restaurant',
            },
            name:String,
            img: Array,
            price:Number,
            qte: Number,
      }],
      mode: {type:String ,default:'UNPAIED'},

        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
        payment:{
            type:Boolean,
            required:true,
            default:false
    
        }
    },
    { timestamps: true },
);

module.exports = mongoose.model('BookingResto', bookingRestoSchema);