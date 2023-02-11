const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const Comment = new Schema({
    blogId: {type: Schema.Types.ObjectId, required: true},
    content: {type: String},
    author: {type: Schema.Types.ObjectId, required: true},
    date: {type: Date, default: Date.now}
});

module.exports = mongoose.model("comments", Comment);
