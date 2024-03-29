const mongoose = require('mongoose');

const {Schema, model} = mongoose

const userSchema = new Schema({
    username: {
        type: String,
        required: [true, 'Username is required'],
        unique: [true, 'Username already exist'],
        minLength: [5, 'Minimum characters is 5']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: [true, 'Email already exist']
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
    },
})

const User = model('User', userSchema)

module.exports = User