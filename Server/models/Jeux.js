const mongoose = require('mongoose');
const Schema=mongoose.Schema;

const jeuxSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    nameJeux: String,
    descriptionJeux: String,
    prixJeux: Number,
    details: String,

    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    imgCollection: {
        type: Array
    },
});

module.exports = mongoose.model('Jeux', jeuxSchema);