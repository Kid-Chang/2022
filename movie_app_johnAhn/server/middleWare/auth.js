const { User } = require("../models/User");

let auth = (req, res, next) => {
    // This is a place where authentication is processed.

    // get token from the Client's cookie.
    let token = req.cookies.x_auth;

    // decode the token and find user.
    User.findByToken(token, (err, user) => {
        if (err) throw err;
        if (!user) return res.json({ isAuth: false, error: true });

        req.token = token;
        req.user = user; // req.token and req.user => middleware, literally process in middle and return revised data
        next(); // Run the next code of middleware.
    });

    // if user exist -> OKay.

    // if user No -> No.
};
module.exports = { auth };
