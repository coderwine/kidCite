const router = require('express').Router();
const Quote = require('../db').import('../models/quote');

//* Validation
const valSession = require('../middleware/validate-session');

//*************************/
//? POST Quote
router.post('/add', valSession, (req, res) => {
    
    const newQuote = {
        title: req.body.title,
        desc: req.body.desc,
        date: req.body.date,
        randomQuestion: req.body.randomQuestion,
        possAnswer: req.body.possAnswer,
        refKid: req.body.refKid, // Will need to reference kid table
        userId: req.user.id
    }
    
    Quote.create(newQuote)
        .then(quote => res.status(200).json({
            quote: quote
        }))
        .catch(err => res.status(500).json({error: err}))
})

//? GET ALL Quotes
router.get('/', (req, res) => {
    Quote.findAll({include: 'user'})
        .then(quote => res.status(200).json(quote))
        .catch(err => res.status(500).json({
            error: err,
            msg: 'Get All Quotes'
        }))
})

//? GET Quote by :id
router.get('/:id', valSession, (req, res) => {
    Quote.findOne({
        where: { id: req.params.id },
        include: "user"
    })
    .then(quote => res.status(200).json(quote))
    .catch(err => res.status(500).json({error: err}))
})


//? PUT (Update) Quote :id
router.put('/:id', valSession, (req, res) => {
    Quote.update(req.body, {
        where: { id: req.params.id },
        include: "user"
    })
    .then(quote => res.status(200).json(quote))
    .catch(err => res.status(500).json({error: err}))
})

//? DELETE Quote
router.delete('/:id', valSession, (req, res) => {
    Quote.destroy({
        where: {
            id: req.params.id
        },
        include: 'user'
    })
    .then(quote => res.status(200).json({
        quote: quote,
        msg: 'Quote Removed'
    }))
    .catch(err => res.status(500).json({error: err}))
})

//***********************/
//! EXPORT 

module.exports = router;