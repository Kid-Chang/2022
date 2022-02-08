const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10; // saltRounds set lang of salt number.
const jwt = require("jsonwebtoken");

const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50,
    },
    email: {
        type: String,
        trim: true, // remove space between text
        unique: 1,
    },
    password: {
        type: String,
        // maxlength: 5,
    },
    lastname: {
        type: String,
        maxlength: 50,
    },
    role: {
        type: Number,
        default: 0,
    },
    image: String, // use not only Object, but also type.
    token: {
        type: String,
    },
    tokenExp: {
        type: Number, // token expiration period
    },
});

// pre is mongoose method. before {save} method, use this code and go on.
userSchema.pre("save", function (next) {
    // "next" callback function is call real next("save") method
    // password encryption.

    var user = this; // direct userSchema.

    if (user.isModified("password")) {
        // use this function only password create or change.
        bcrypt.genSalt(saltRounds, function (err, salt) {
            // salt using encrypt
            if (err) return next(err);

            bcrypt.hash(user.password, salt, function (err, hash) {
                // first arg is plan password(before encrypt)
                // third arg is callback fuction. it's second arg is encrypt password.
                if (err) return next(err);
                user.password = hash; // if encrypt success, change user.password.
                next(); // call real "save" function.
            });
        });
    } else {
        next(); // if not change password, just go next();
    }
});

userSchema.methods.comparePassword = function (plainPW, callBack) {
    // this logic is that unencrypted password(client input) encrypt, so that compare db saved password
    bcrypt.compare(plainPW, this.password, function (err, isMatch) {
        if (err) return callBack(err);
        callBack(null, isMatch);
    });
};

userSchema.methods.generateToken = function (callBack) {
    const user = this;
    // using jsonwebtoken, make token.
    // jwt logic : user._id + "secretToken" = specific jwt value
    // ==> using "secretToken" => you get user._id value.
    const token = jwt.sign(user._id.toHexString(), "secretToken");
    user.token = token;
    user.save(function (err, user) {
        if (err) return callBack(err);
        callBack(null, user);
    });
};

// methods : method must create instance by keyward "New".
// statics : isn't

userSchema.statics.findByToken = function (token, callBack) {
    var user = this;

    // decode the token.
    jwt.verify(token, "secretToken", function (err, decoded) {
        // .verify(token that will decode, key used to encrypt)

        // find User using decoded(===userId),
        // and verify that token that comes from Client and token that saved in DB

        user.findOne(
            { _id: decoded, token: token }, // .findOne is origin method
            function (err, user) {
                if (err) return callBack(err);
                callBack(null, user);
            },
        );
    });
};

const User = mongoose.model("User", userSchema);
// mongoose.model( "Using Name(===alias)", using Schema )

module.exports = { User };
