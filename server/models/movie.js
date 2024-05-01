const mongoose = require('mongoose');

const {Schema, model} = mongoose

const movieSchema = new Schema({
    name: {
        type: String
    },
    img: {
        type: String
    },
    year: {
        type: Number
    },
    genre: {
        type: [String]
    },
    rating: {
        type: Number
    }
}, {
    versionKey: false
})

const Movie = model('Movie', movieSchema)

module.exports = Movie