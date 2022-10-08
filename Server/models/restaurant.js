const mongoose = require('mongoose');
const Schema=mongoose.Schema;

const restaurantSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        required: true,
        trim: true
    },
    address: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: Number
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    description: {
        type: String,
        trim: true
    },
    imgCollection: {
        type: Array
    },
});

module.exports = mongoose.model('Restaurant', restaurantSchema);
