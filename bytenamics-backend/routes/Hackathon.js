const Hackathon = require('../models/Hackathons');
const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const { body, validationResult } = require('express-validator');
const User = require('../models/User')

//Route 1: Getting all Hackathons
router.get('/fetch',async(req,res) =>{
    try {
        const hackathons = await Hackathon.find();
        res.json(hackathons);
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Internal Server Error');
    }
})

//Route 2: Adding a New Hackathon
router.post('/add', fetchuser, [
    body('title', 'Enter a valid Title').isLength({ min: 5 }),
    body('description', 'Enter a valid Description').isLength({ min: 5 }),
], async (req, res) => {
    try {
        const {title,description,platform,date} = req.body;
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({error:errors.array()})
        }
        const user = await User.findById(req.user.id).select('-password');
        if(!user){
            return res.status(400).json({error:'Invalid User'}) 
        }
        if(user.role!=='admin'){
            return res.status(403).json({error:'You are not authorized to add a hackathon'})
        }
        const hackathon = await new Hackathon({
            title,description,platform,date:(new Date(date)),organizerid: req.user.id,organizername:user.name
        })
        const savedHackathon = await hackathon.save();
        res.json(savedHackathon);
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Internal Server Error');
    }
})

//Delete a Hackathon
router.delete('/delete/:id', fetchuser ,async (req ,res)=>{
    try{

        let hackathon = await Hackathon.findById(req.params.id);
        if(!hackathon){
            return res.status(400).send('Not found');
        }

        const user = await User.findById(req.user.id).select('-password');
        if(user.role!=='admin'){
            return res.status(403).json({error:'You are not authorized to add a hackathon'})
        }

        //Check User Permissions
        if(hackathon.organizerid.toString() !== req.user.id){
            return res.status(401).send("Change not Allowed");
        }
        hackathon = await Hackathon.findByIdAndRemove(req.params.id);
        res.json({"Success":"Deleted Successfully",hackathon});

    }catch(err){
        console.log(err.message);
        res.status(500).send('Internal Server Error')
    }
})

//Find Admin Hackathons
router.get('/myhackathons', fetchuser ,async (req ,res)=>{
    try{
        const hackathons = await Hackathon.find({organizerid:req.user.id});
        res.json(hackathons);
    }catch(err){
        console.log(err.message)
        res.status(500).send('Internal Server Error');
    }
})

module.exports = router;
