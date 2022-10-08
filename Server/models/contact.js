const mongoose = require('mongoose');

const contactSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    firstName: String,
    lastName: String,
    mail: String,
    message: { type : String , required : true}
});

module.exports = mongoose.model('Contact', contactSchema);