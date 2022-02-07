const mongoose = require("mongoose");
const favoriteSchema = mongoose.Schema(
    {
        userForm: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            // using this type and ref, this Schema can use "User" Schema values by ObjectId.
            // search keyword: 'populate'
        },
        movieId: {
            type: String,
        },
        movieTitle: {
            type: String,
        },
        moviePost: {
            type: String,
        },
        movieRunTime: {
            type: String,
        },
    },
    { timestamps: true },
);

const Favorite = mongoose.model("Favorite", favoriteSchema);
// mongoose.model( "Using Name(===alias)", using Schema )

module.exports = { Favorite };
