const Participant = require('../models/Participants')
const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const { body, validationResult } = require('express-validator');
const User = require('../models/User')

//Join a Hackathon
router.post('/join', fetchuser, async (req, res) => {
    try {
        const { name, email, hackathonid } = req.body;
        const user = await User.findById(req.user.id).select('-password');
        if(!user){
            return res.status(400).json({error:'Invalid User'}) 
        }
        const prevParticipant = await Participant.find({
            $and: [
              { email: email },
              { hackathonid: hackathonid }
            ]
        });
        if(prevParticipant.length){
            console.log(prevParticipant)
            return res.json({success:true,message:`You have Already Registered for the Event`});
        }
        const participant = await new Participant({ name, email, hackathonid });
        const savedParticpant = await participant.save();
        res.json({success:true,message:`${savedParticpant.name} registered Successfully`});
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Internal Server Error');
    }
})

//Get hackathon Details
router.get('/get/:id', fetchuser, async (req, res) => {
    try {
        const hackathonid = req.params.id;
        const user = await User.findById(req.user.id).select('-password');
        if(!user){
            return res.status(400).json({error:'Invalid User'}) 
        }
        if(user.role!=='admin'){
            return res.status(403).json({error:'You are not authorized to add a hackathon'})
        }
        const participants = await Participant.find({hackathonid});
        res.json(participants);
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Internal Server Error');
    }
})

module.exports = router;