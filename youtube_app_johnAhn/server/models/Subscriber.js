const mongoose = require("mongoose");

const subscriberSchema = mongoose.Schema(
    {
        userTo: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            //  get all infomation of userSchema by getting objectId.
        },
        userFrom: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            //  get all infomation of userSchema by getting objectId.
        },
    },
    { timestamps: true },
);

const Subscriber = mongoose.model("Subscriber", subscriberSchema);
// mongoose.model( "Using Name(===alias)", using Schema )

module.exports = { Subscriber };
