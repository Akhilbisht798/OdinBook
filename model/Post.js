const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Post = new Schema({
    author: {type: Schema.Types.ObjectId},
    title: {type: String},
    img: {type: String},
    content: {type: String},
    likes: {type: Number, default: 0},
});

module.exports = mongoose.model("posts", Post);