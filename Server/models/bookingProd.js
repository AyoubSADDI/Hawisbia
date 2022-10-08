const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookingProdSchema = new Schema(
    {
        _id: mongoose.Schema.Types.ObjectId,
        products: [{
            eventId: {
                type: Schema.Types.ObjectId,
                ref: 'Product',
            },
            name:String,
            img: Array,
            price:Number,
            qte: Number,
            unite:String
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

module.exports = mongoose.model('BookingProd', bookingProdSchema);