const express = require("express");
const router = express.Router();
const { Comment } = require("../models/Comment");

//=================================
//             Comment
//=================================

router.post("/saveComment", (req, res) => {
    const comment = new Comment(req.body);
    comment.save((err, comment) => {
        if (err) return res.json({ success: false, err });

        // Can't use  populate method in save method.
        // So, We use find method. because after save method, we use find method for using populate method.

        Comment.find({ _id: comment._id })
            .populate("writer")
            .exec((err, result) => {
                if (err) return res.json({ success: false, err });
                res.status(200).json({ success: true, result });
            });
    });
});

router.post("/getComments", (req, res) => {
    Comment.find({ postId: req.body.videoId })
        .populate("writer")
        .exec((err, comments) => {
            if (err) return res.status(400).json({ success: false });
            return res.status(200).json({ success: true, comments });
        });
});

module.exports = router;
