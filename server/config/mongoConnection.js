
const { MongoClient } = require('mongodb');
const uri = process.env.MONGO_URI

const client = new MongoClient(uri);

const db = client.db('IdlixClone')

const getCollection = (collectionName) => {
    return db.collection(collectionName)
}

module.exports = getCollection