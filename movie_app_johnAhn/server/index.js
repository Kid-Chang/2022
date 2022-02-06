const express = require("express");
const app = express();
const port = 4001;
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const config = require("./config/key");
const { User } = require("./models/User");
const req = require("express/lib/request");
const { auth } = require("./middleWare/auth");
require("dotenv").config();

// application/x-www-form-urlencoded, value possible "input"
app.use(bodyParser.urlencoded({ extended: true }));
// application/json, value possbile "input"
app.use(bodyParser.json());
app.use(cookieParser());

mongoose
    .connect(config.mongoURI)
    .then(() => console.log("MongoDB conntected..."))
    .catch((err) => console.log(err));

app.get("/", (req, res) => res.send("hello world hello~"));
// req is client's send value;

// res is server's value;

// register route
app.post("/api/users/register", (req, res) => {
    //get data from client when register, they put in database.

    const user = new User(req.body);

    // password crypt
    user.save((err, doc) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).json({
            success: true,
        }); // if success, only return doc.
    });
});

app.post("/api/users/login", (req, res) => {
    // find requested email in database.
    User.findOne({ email: req.body.email }, (err, user) => {
        if (!user) {
            return res.json({
                loginSuccess: false,
                message: "제공된 이메일에 해당하는 유저가 없습니다.",
            });
        }
        // if requested email exist, confirm requested password is correct password.

        user.comparePassword(
            // "comparePassword" Method is Method i made.
            req.body.password,
            (err, isMatch) => {
                if (!isMatch)
                    return res.json({
                        loginSuccess: false,
                        message: "비밀번호가 틀렸습니다.",
                    });

                // all right, make token.
                user.generateToken((err, user) => {
                    if (err) return res.status(400).send(err);

                    // save token in Client.(ex. localStorage, cookie)

                    // this code save token in cookie.

                    res.cookie("x_auth", user.token).status(200).json({
                        loginSuccess: true,
                        userId: user._id,
                    });
                });
            },
        );
    });
});

app.get("/api/users/auth", auth, (req, res) => {
    // Since it went through middleware, req.token and req.user inquiry is possible.
    //
    // Can read this code === authentication is True

    res.status(200).json({
        _id: req.user._id,
        idAdmin: req.user.role === 0 ? false : true,
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
        role: req.user.role, //role === 0 -> normal user, 1 -> admin, 2-> Admin of a specific department..
    });
});

app.get("/api/users/logout", auth, (req, res) => {
    User.findByIdAndUpdate(
        { _id: req.user._id },
        { token: "" },
        (err, user) => {
            if (err) return res.json({ success: false, err });
            return res.status(200).json({ success: true });
        },
    );
}); //delete token in db, processing on middleware "auth" will return false. so that, we use this way.

app.get("/api/hello", (req, res) => {
    res.send("안녕하세요");
});

app.listen(port, () => console.log(`example app listening on Port ${port}!`));
