const express = require("express");
const app = express();
const port = 4001;
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const config = require("./config/key");
// const { User } = require("./models/User");
// const req = require("express/lib/request");
// const { auth } = require("./middleWare/auth");
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

//to not get any deprecation warning or error
//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));
//to get json data
// support parsing of application/json type post data
app.use(bodyParser.json());
app.use(cookieParser());

app.use("/api/users", require("./routes/users"));
app.use("/api/video", require("./routes/video"));
// app.use("/api/favorite", require("./routes/favorite"));
// app.use('/api/comment', require('./routes/comment'));
// app.use('/api/like', require('./routes/like'));

//use this to show the image you have in node js server to client (react js)
//https://stackoverflow.com/questions/48914987/send-image-path-from-node-js-express-server-to-react-client
app.use("/uploads", express.static("uploads"));

// // Serve static assets if in production
// if (process.env.NODE_ENV === "production") {

//   // Set static folder
//   app.use(express.static("client/build"));

//   // index.html for all page routes
//   app.get("*", (req, res) => {
//     res.sendFile(path.resolve(__dirname, "../client", "build", "index.html"));
//   });
// }

app.listen(port, () => {
    console.log(`Server Running at ${port}`);
});
