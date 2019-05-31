const passport = require('passport');
const jwt = require('jsonwebtoken');

require('dotenv').config();

//import JWT secret
const secret = process.env.JWT_SECRET;
 
//load user model
const User = require('../models/User');

//Sign jwt token function
module.exports = signToken = user => {
    return jwt.sign({
        email: user.email
    }, secret, { expiresIn: '8h' });
}

//receive and verify token
module.exports.verifyToken = (req, res, next) => {
    const bearerHeader = req.headers['auth'];
        if(bearerHeader !== undefined){
        const bearerToken = bearerHeader.split(' ');
        req.token = bearerToken[1];
        //verify the token
        jwt.verify(req.token, secret, (err, authData) => {
            if(err){
                res.status(403).json({ msg: 'Forbidden' });
            }
            else{
                req.auth = authData;
                return next();
            }
        })
    }
        else{
            res.status(403).json({
                msg: 'Forbidden'
            });
        } 
}