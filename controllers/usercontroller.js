const router = require('express').Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../db').import('../models/user');

router.post('/signup', (req, res) => {
    // res.send('Connected!')
    let fName = req.body.firstName;
    let lName = req.body.lastName;
    let email = req.body.email;
    let pass = req.body.password;
    let role = req.body.role;
    let id = req.body.id;

    User.create({
        firstName: fName,
        lastName: lName,
        email: email,
        password: bcrypt.hashSync(pass, 13),
        role: role,
        id: id
    }).then(
        createSuccess = (user) => {
            user.json({
                user: user,
                message: 'User Created!',
                funObject: 'This is a meaningless Object'
            })
        }
    )
})

module.exports = router;