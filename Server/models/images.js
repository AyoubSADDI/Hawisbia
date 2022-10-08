const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const imagesSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    imgCollection: {
        type: Array
    }
}, {
    collection: 'imagess'
})

module.exports = mongoose.model('Imagess', imagesSchema)