const router = require('express').Router();

//* MODELS
const Kid = require('../db').import('../models/kid');
// const Quote = require('../db').import('../models/quote');

//* Validation
const valSession = require('../middleware/validate-session');

//! POST Kid
router.post('/add_kid', valSession, (req, res) => {

    const kidCreate = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        dob: req.body.dob,
        bio: req.body.bio,
        userId: req.user.id
    }

    Kid.create(kidCreate)
    // .then(info => console.log(json(info)))
    .then(kid => res.status(200).json(kid))
    .catch(err => res.status(500).json({ 
        error: err,
        msg: "Error in Create"    
    }))

})

//! GET ALL Kids
router.get('/', (req, res) => {
    Kid.findAll({include: 'user'})
        .then(kid => res.status(200).json(kid))
        .catch(err => res.status(500).json({error: err}))
})

//! GET Kid by :name
router.get('/:name', valSession, (req, res) => {
    Kid.findOne({
        where: { 
            firstName: req.params.name
        },
        // include: ['user', 'quote']
        include: 'user'
    })
    .then(kid => res.status(200).json(kid))
    .catch(err => res.status(500).json({error: err}))
})

//! PUT (Update) Kid :id
router.put('/:id', valSession, (req,res) => {
    Kid.update(req.body, {
        where: {
            id: req.params.id
        },
        include: 'user'
    })
    .then(kid => res.status(200).json({kid: kid}))
    .catch(err => res.status(500).json({error: err}))
})
// need to fix so users can't update kids that are NOT theirs

//! DELETE Kid
router.delete('/:id', valSession, (req, res) => {
    Kid.destroy({
        where: {
            id: req.params.id
        },
        include: 'user'
    })
    .then(kid => res.status(200).json({
        kid: kid,
        msg: 'Child Removed'
    }))
    .catch(err => res.status(500).json({error: err}))
})

//***********************/
//! EXPORT 

module.exports = router;