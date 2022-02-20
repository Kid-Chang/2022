const mongoose = require("mongoose");

const dislikeSchema = mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
        },
        commentId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment",
        },
        videoId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Video",
        },
    },
    { timestamps: true },
);

const Dislike = mongoose.model("Dislike", dislikeSchema);
// mongoose.model( "Using Name(===alias)", using Schema )

module.exports = { Dislike };
