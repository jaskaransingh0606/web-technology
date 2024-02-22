const mongoose = require('mongoose');
const dotenv = require('dotenv').config();

const mongoURI = process.env.DB_URL || 'mongodb://127.0.0.1:27017/bytenamics';


const connectToMongo = async () => {
    try {
        await mongoose.connect(mongoURI);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.log('Error connecting to MongoDB: ', error.message);
    }
}

module.exports = connectToMongo;