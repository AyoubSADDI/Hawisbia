const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Place=require("../models/place")

const circuitSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    desc: String,
    details: String,
    videos: {
        type: Array
    },
    imgCollection: {
        type: Array
    },
    audios: {
        type: Array
    },



});

module.exports = mongoose.model('Circuit', circuitSchema);