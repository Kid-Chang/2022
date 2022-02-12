const mongoose = require("mongoose");

const videoSchema = mongoose.Schema(
    {
        writer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            // videoSchema get all infomation of userSchema by getting objectId.
        },
        title: {
            type: String,
            maxlength: 50,
        },
        description: {
            type: String,
        },
        privacy: {
            type: Number,
        },
        filePath: {
            type: String,
        },
        catogory: {
            type: String,
        },
        views: {
            type: Number,
            default: 0,
        },
        duration: {
            type: String,
        },
        thumbnail: {
            type: String,
        },
    },
    { timestamps: true },
);

const Video = mongoose.model("Video", videoSchema);
// mongoose.model( "Using Name(===alias)", using Schema )

module.exports = { Video };
