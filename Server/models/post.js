const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postsSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
  message: {type: String, required: true },
  created_at: {type: Date, required: true, default: Date.now() },
  updated_at: {type: Date, required: true, default: Date.now() },
  likes: {type: Number},
  author_id: {type: String, required: true },
  author_email: {type: String, required: true },
  author_name: {type: String, required: true }

});

module.exports = postsSchema;