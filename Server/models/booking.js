const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookingSchema = new Schema(
    {
        _id: mongoose.Schema.Types.ObjectId,
        events: [{
            eventId: {
                type: Schema.Types.ObjectId,
                ref: 'Event',
            },
            name:String,
            img: Array,
            price:Number,
            qte: Number
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

module.exports = mongoose.model('Booking', bookingSchema);