const mongoose = require('mongoose');

const { Schema, model } = mongoose

const watchListSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    movies: [{
        type: Schema.Types.ObjectId,
        ref: 'Movie'
    }]
},
{
    versionKey: false
})

const WatchList = model('WatchList', watchListSchema)

module.exports = WatchList