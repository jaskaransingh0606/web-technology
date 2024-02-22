const mongoose = require('mongoose');

const ParticipantsSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    hackathonid: {type: mongoose.Schema.Types.ObjectId, ref: 'hackathon',required:true}
})

const Participant = mongoose.model('participant',ParticipantsSchema);
module.exports = Participant;