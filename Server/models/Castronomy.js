const mongoose = require('mongoose');
const Schema=mongoose.Schema;

const castronomySchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    nameCastronomy: String,
    descriptionCastronomy: String,
    details: String,

    imgCollection: {
        type: Array
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    prixCastronomy: Number,
});

module.exports = mongoose.model('Castronomy', castronomySchema);