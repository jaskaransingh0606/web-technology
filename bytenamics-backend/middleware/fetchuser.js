const jwt = require('jsonwebtoken');
const JWT_SECRET =  process.env.JWT_SECRET || 'AsecretString$$$';

const fetchuser = (req,res,next) => {
    const token = req.header('auth-token');
    if(!token){
        res.status(401).send({error:'Authenticate with valid Token'});
    }
    try{
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user;
        next();
    }catch(err){
        res.status(401).send({error: 'Authenticate with a valid token'});
    }
}

module.exports = fetchuser;
