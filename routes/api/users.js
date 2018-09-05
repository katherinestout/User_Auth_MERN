const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');

//Bring in usermodel
const User = require('../../models/User');

// @route   GET api/users/test
// @desc    Tests users route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'Users Works' }));

// @route   GET api/users/login
// @desc    Login route -- returning the jwt
// @access  Public
//return jwt
router.post('/login', (req, res) => {
const email = req.body.email;
const password = req.body.password;

User.findOne({email})
.then(user => {
    //check for user
    if(!user){
        return res.status(404).json({email: 'User not found!'});
    }
    //check password
    bcrypt.compare(password, user.password )
    .then(isMatch => {
        if(isMatch){
//user matched
//create jwt payload
const payload = { id: user.id, name: user.name }

           // res.json({msg: 'Sucess'});
//
//sign the token
jwt.sign(payload, 
    keys.secretOrKey, 
    {expiresIn: 360000}, 
    (err, token) => {
        res.json({
            success: true,
            token: 'Bearer' + token
        });
    });
        } else {
            return res.status(400).json({password: 'Password incorrect'});
        }
        });
    });

});



// @route   GET api/users/register
// @desc    Registerroute
// @access  Public


router.post('/register', (req, res)=> {
    //we want to register
User.findOne({email: req.body.email})
.then(user => {
    if(user){
        return res.status(400).json({email: 'email already exists'});
    } else {
        const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        });
//hashing the password w/salt, set hashed password to password
//making a password with salt and hash with bcrypt
//save user to the db
bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, (err, hash) => {
        if(err) throw err;
        newUser.password = hash;
        newUser.save().then(user => 
            res.json(user)).catch(err => console.log(err));


    });
});
}
});

});
    module.exports = router;
