const express = require("express");
const router = express.Router();

/* MONGOOSE MODEL */
const messageModel = require('./../../models/messages.model.js');

/* GET */
router.get('/sync', (req, res) => {
    messageModel.find({userID: req.query.userid}, (err, data) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(data);
        }
    })
});

/* POST */
router.post('/new', (req, res) => {
    messageModel.create(req.body, (err, data) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(201).send(data);
        }
    })
})


module.exports = router;