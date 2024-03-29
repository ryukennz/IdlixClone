
const mongoose = require('mongoose');

const uri = process.env.MONGO_URI

// console.log(uri, "<< ");

const connect = async () => {
    try {
        await mongoose.connect(uri)
        console.log(`Mongo connection Success`);
    } catch (err) {
        console.log(err);
    }
}

connect()

// module.exports = mongooseDbConnect

// const client = new MongoClient(uri);

// const db = client.db('idlixclone')

// const getCollection = (collectionName) => {
//     return db.collection(collectionName)
// }

// module.exports = getCollection