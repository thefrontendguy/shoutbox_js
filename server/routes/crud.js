const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const bodyParser = require('body-parser');
router.use(bodyParser.json());

// import Shout Model
const Shout = require('../models/shoutModel');

router.get('/', (req, res) => {
    res.send('nothing to see here');
})

// save ONE new shout
router.post('/create', (req, res, next) => {
    const shout = new Shout({
        user_ip: req.body.user_ip,
        user_agent: req.body.user_agent,
        shout_text: req.body.shout_text
    });
    // save new shout in the db
    shout.save()
        .then(result => {
        })
        .catch(err => console.log(err));
});

// get all shouts
router.get('/read', (req, res, next) => {
    Shout.find()
        .then(result => {
            res.send(result);
        })
        .catch(err => {
            console.log(err);
        })
});

// no need for shout update. but CRD also sounds nice. 

// delete shout
router.delete('/:id', (req, res, next) => {
    const id = req.params.id;
    Shout.remove({ _id: id })
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
        })
});

module.exports = router;