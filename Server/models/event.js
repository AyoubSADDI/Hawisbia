const mongoose = require('mongoose');
const Schema=mongoose.Schema;

const eventSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    placesNembre : Number,
    startDate : String,
    endDate : String,
    desc : String,
    details: String,
    favoris:{
        type: Array
    },
    comments:[
        {
            userId: {
                type: Schema.Types.ObjectId,
                ref: 'User',
            },
            name:String,
            img: String,
            content:String,
            created: {
                type: Date,
                // `Date.now()` returns the current unix timestamp as a number
                default: Date.now
              },
            updated: {
                type: Date,
                // `Date.now()` returns the current unix timestamp as a number
                default: Date.now
              },

            
      }
    ],

    price:Number,
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    imgCollection: {
        type: Array
    }});

module.exports = mongoose.model('Event', eventSchema);