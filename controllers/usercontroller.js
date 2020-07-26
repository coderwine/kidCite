const router = require('express').Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../db').import('../models/user');

//! SIGNUP
router.post('/signup', (req, res) => {
    // res.send('Connected!')
    let fName = req.body.firstName;
    let lName = req.body.lastName;
    let email = req.body.email;
    let pass = req.body.password;
    let role = req.body.role;
    let bio = req.body.bio;
    let id = req.body.id;

    User.create({
        firstName: fName,
        lastName: lName,
        email: email,
        password: bcrypt.hashSync(pass, 13),
        role: role,
        bio: bio,
        id: id
    }).then(
        createSuccess = (user) => {
            let token = jwt.sign({id: user}, process.env.JWT, {expiresIn: 60*60*12})
            res.status(200).json({
                user: user,
                sessionToken: token
            })
        })
    .catch(err => res.status(500).json({error: err}))
})

//! LOGIN

//! UPDATE

//! DELETE

module.exports = router;