const mongoose = require('mongoose');
const { Schema } = mongoose;

const HackathonSchema = new Schema({
    organizerid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    organizername: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    platform:{
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    }
})

const Hackathon = mongoose.model('hackathon',HackathonSchema);

module.exports  = Hackathon;