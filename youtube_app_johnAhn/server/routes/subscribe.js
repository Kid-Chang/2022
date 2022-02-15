const express = require("express");
const router = express.Router();
const { Subscriber } = require("../models/Subscriber");

//=================================
//             Subscribe
//=================================

router.post("/subscribeNumber", (req, res) => {
    Subscriber.find({ userTo: req.body.userTo }).exec((err, userTo) => {
        if (err) return res.status(400).send(err);
        return res.status(200).json({
            success: true,
            subscriberNumber: this.subscribe.length,
        });
    });
});

router.post("/subscribed", (req, res) => {
    Subscriber.find({
        userTo: req.body.userTo,
        userFrom: req.body.userFrom,
    }).exec((err, userTo) => {
        if (err) return res.status(400).send(err);
        return res.status(200).json({
            success: true,
            subscribed: this.subscribe.length > 0 ? true : false,
        });
    });
});

router.post("/unsubscribe", (req, res) => {
    Subscriber.findOneAndDelete({
        userTo: req.body.userTo,
        userFrom: req.body.userFrom,
    }).exec((err, doc) => {
        if (err) return res.status(400).send(err);
        return res.status(200).json({
            success: true,
            doc,
        });
    });
});

router.post("/subscribe", (req, res) => {
    const subscribe = new Subscriber(req.body);

    subscribe.save((err, doc) => {
        if (err) return res.status(400).send(err);
        return res.status(200).json({
            success: true,
            doc,
        });
    });
});

module.exports = router;
