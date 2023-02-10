const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Post = new Schema({
    author: {type: Schema.Types.ObjectId},
    img: {type: String},
    content: {type: String},
    likes: [{type: Schema.Types.ObjectId}],
});

Post.virtual('TotalLike').get(function () {
    return this.likes.length;
})

module.exports = mongoose.model("posts", Post);