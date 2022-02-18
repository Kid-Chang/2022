const mongoose = require("mongoose");

const commentSchema = mongoose.Schema(
    {
        writer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            //  get all infomation of userSchema by getting objectId.
        },
        postId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Video",
            //  get all infomation of userSchema by getting objectId.
        },
        responseTo: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        content: {
            type: String,
        },
    },
    { timestamps: true },
);

const Comment = mongoose.model("Comment", commentSchema);
// mongoose.model( "Using Name(===alias)", using Schema )

module.exports = { Comment };
