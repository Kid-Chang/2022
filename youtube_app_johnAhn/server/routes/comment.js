const express = require("express");
const router = express.Router();
const { Comment } = require("../models/Comment");

//=================================
//             Comment
//=================================

router.post("/saveComment", (req, res) => {
    const commnet = new Comment(req.body);
    commnet.save((err, comment) => {
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

module.exports = router;
