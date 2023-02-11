const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new  Schema({
    username: {type: String},
    password: {type: String},
    friend: [{type: Schema.Types.ObjectId}],
    Request: [{type: Schema.Types.ObjectId}],
    email: {type: String, unique: true},
    fbId: {type: String},
    profilePic: {type: String},
});

module.exports = mongoose.model("Users", User);
