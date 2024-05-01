const mongoose = require('mongoose');

const uri = process.env.MONGO_URI

const connect = async () => {
    try {
        await mongoose.connect(uri)
        // console.log(`Mongo connection Success`);
    } catch (err) {
        console.log(err);
    }
}

connect()