const mongoose = require('mongoose');

const {Schema, model} = mongoose

const userSchema = new Schema({
    username: {
        type: String,
    },
    email: {
        type: String
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    }
},{
    versionKey: false
})

const User = model('User', userSchema)

module.exports = User