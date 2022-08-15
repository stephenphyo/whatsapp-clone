const express = require("express");
const router = express.Router();

/* MONGOOSE MODEL */
const roomModel = require('./../../models/rooms.model.js');

/* POST */
router.post('/new', (req, res) => {
    roomModel.create(req.body, (err, data) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(201).send(data);
        }
    })
});

/* GET */
router.get('/sync', (req, res) => {
    roomModel.find({owner: req.query.owner}, (err, data) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(data);
        }
    })
});

router.get('/id', (req, res) => {
    roomModel.find({roomName: req.query.roomName}, (err, data) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(data);
        }
    })
})

module.exports = router;