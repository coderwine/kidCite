const router = require('express').Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../db').import('../models/user');
const valSession = require('../middleware/validate-session');

//! SIGNUP
router.post('/signup', (req, res) => {
    
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
router.post('/login', (req,res) => {

    User.findOne({ where: { email: req.body.email }})
    .then(
        (user) => {
            if(user) {
                bcrypt.compare(req.body.password, user.password, (err, matches) => {
                    if(matches) {
                        let token = jwt.sign(
                            {id: user.id},
                            process.env.JWT, 
                            {expiresIn: 60*60*12});

                        res.status(200).json({ 
                            user: user,
                            msg: "Successfully Logged In",
                            sessionToken: token
                        })

                    } else {
                        res.status(502).send({ error: "Login Failed within Matching" });
                    }
                })
            } else {
                res.status(500).send({ error: 'Failed to Authenticate User'});
            }
        },
        (err) => {
            res.status(501).send({ error: "Login Failed Overall"})
        }
    )

});


//! UPDATE
router.put('/user-update/:id', valSession, (req, res) => {
    User.update(req.body, {
        where: {
            id: req.params.id,
            // owner: req.user.id
        },
        include: 'kid'
    })
    .then(info => res.send(info))
    .then(user => res.status(200).json(user))
    .catch(err => res.status(500).json({ 
        error: err,
        msg: 'Broken in the Update' 
    }))
})


//! DELETE

module.exports = router;