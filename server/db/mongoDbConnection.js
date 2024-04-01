
const mongoose = require('mongoose');

const { MongoClient } = require('mongodb');

const uri = process.env.MONGO_URI

const connect = async () => {
    try {
        await mongoose.connect(uri)
        // console.log(`Mongo connection Success`);
    } catch (err) {
        console.log(err);
    }
}

const client = new MongoClient(uri)

const db = client.db('projectidlixclone')

connect()

module.exports = db