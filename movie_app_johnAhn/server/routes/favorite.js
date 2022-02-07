const express = require("express");
const router = express.Router();
const { Favorite } = require("../models/Favorite");

//=================================
//             Favorite
//=================================

router.post("/favoriteNumber", (req, res) => {
    // get favorite Number value from mongoDB.
    Favorite.find({ movieId: req.body.movieId }).exec((err, info) => {
        if (err) return res.status(400).send(err);
        // retrun favorite Number value to res.
        return res
            .status(200)
            .json({ success: true, favoriteNumber: info.length });
    });
});

router.post("/favorited", (req, res) => {
    // get favorite Number value from mongoDB.

    // get data whether this user push this movie in user's favorite list from DB.

    Favorite.find({
        movieId: req.body.movieId,
        userFrom: req.body.userFrom,
    }).exec((err, info) => {
        if (err) return res.status(400).send(err);
        // retrun favorite Number value to res.

        let result = false;
        if (info.length !== 0) {
            result = true;
        }

        return res.status(200).json({
            success: true,
            favoriteNumber: info.length,
            favorited: result,
        });
    });
});

router.post("/addToFavorite", (req, res) => {
    const favorite = new Favorite(req.body);
    favorite.save((err, doc) => {
        if (err) return res.status(400).send(err);
        return res.status(200).send({ success: true });
    });
});

router.post("/removeFromFavorite", (req, res) => {
    Favorite.findOneAndDelete({
        movieId: req.body.movieId,
        userFrom: req.body.userFrom,
    }).exec((err, doc) => {
        if (err) return res.status(400).send(err);
        return res.status(200).json({ success: true, doc });
    });
});

router.post("/getFavoredMovie", (req, res) => {
    Favorite.find({ userFrom: req.body.userFrom }).exec((err, favorites) => {
        if (err) return res.status(400).send(err);
        return res.status(200).json({
            success: true,
            favorites,
        });
    });
});

module.exports = router;
