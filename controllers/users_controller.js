const bcrypt = require('bcryptjs');

//import jwt
const signToken = require('../config/jwtauth');

module.exports.register = (req, res) => {
    var { email, password } = req.body;
    if(!email || !password){
        res.status(400).json({
            msg: 'All fields are mandatory!!'
        });
    }
    const emailFormat = /\S+@\S+\.\S+/;
    const passwordFormat = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})');
    if(emailFormat.test(email)){
        if(passwordFormat.test(password)){
            User.findOne({ email: {$regex: email, $options: 'i' }}).then(user => {
                if(user){
                    res.status(400).json({
                        msg: 'Email ID already registered!!'
                    })
                }
                else{
                    bcrypt.genSalt(10, (err, salt) =>{
                        bcrypt.hash(password, salt, (err, hash) => {
                            if(err) throw err;
                            else{
                                password = hash;
                                User.create({ email, password }).then(() => {
                                    res.status(200).json({
                                        msg: 'Registered Successfully!!'
                                    })
                                }).catch(err => console.log(err))
                            }
                        })
                    })
                }
            }).catch(err => console.log(err))
        }
        else{
            res.status(400).json({
                msg: 'Password must be atleast 8 characters long and contain atleast one lowercase, one uppercase letters and one number'
            });
        }
    }
    else{
        res.status(400).json({
            msg: 'Invalid email.'
        });
    }
}

module.exports.login = (req, res) => {
    const{ email, password } = req.body;
    if(!email || !password){
        res.status(400).json({
            msg: 'All fields are mandatory!!'
        });
    }
    User.findOne({ email }).then(user => {
        if(user){
            bcrypt.compare(password, user.password, (err, isMatch) => {
                if(err) throw err;
                if(isMatch){
                    token = signToken(user);
                    res.status(200).json({
                        token
                    });
                }
                else{
                    res.status(400).json({
                        msg: 'Invalid Password!!'
                    });
                }
            });
        }
        else{
            res.status(400).json({
                msg: 'Email ID not registered!!'
            });
        }
    }).catch(err => console.log(err))
}