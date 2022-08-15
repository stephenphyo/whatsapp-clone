const express = require("express");
const router = express.Router();

/* MONGOOSE MODEL */
const userModel = require('./../../models/users.model.js');

/* POST */
router.post('/new', (req, res) => {
    userModel.create(req.body, (err, data) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(201).send(data);
        }
    })
});

/* PUT */
router.put('/update/room', (req, res) => {
    userModel.findOneAndUpdate({userID: req.query.userID}, {$push: {memberOf: req.query.roomID}},
        (err, data) => {
            if (err) {
                res.status(500).send(err);
            } else {
                res.status(200).send(data);
            }
        });
});

module.exports = router;