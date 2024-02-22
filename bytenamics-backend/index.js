const connectToMongo = require('./db');
const dotenv = require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app =  express();
const PORT = process.env.PORT || 5000;
const DB_URL = process.env.DB_URL;

connectToMongo();
app.use(cors());
app.use(express.json());

//Routes
app.use('/auth/user',require('./routes/auth.js'))
app.use('/hackathons',require('./routes/Hackathon.js'))
app.use('/participants',require('./routes/Participants.js'))


app.listen(PORT, ()=> {
    console.log(`Listening on port ${PORT}`);
})