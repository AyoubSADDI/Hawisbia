const mongoose = require('mongoose');

const campingSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        required: true,
        trim: true
    },
    nbrStar: {
        type: Number,
        required: true
    },
    price: {
        type: Number
    },
    description: {
        type: String,
        trim: true
    },
    imgCollection: {
        type: Array
    },
});

module.exports = mongoose.model('Camping', campingSchema);