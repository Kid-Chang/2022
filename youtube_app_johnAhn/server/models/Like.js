const mongoose = require("mongoose");

const likeSchema = mongoose.Schema(
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

const Like = mongoose.model("Like", likeSchema);
// mongoose.model( "Using Name(===alias)", using Schema )

module.exports = { Like };
