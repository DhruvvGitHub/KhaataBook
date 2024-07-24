const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const isLoggedIn = (req, res, next) => {
    const token = req.cookies.token;

    if(!token) {
        req.flash("error", "You need to login first")
        return res.redirect("/")
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
        if(decoded) {
            next()
        }
        else {
            return res.redirect("/")
        }
    }
    catch {
        return res.redirect("/")
    }
}

module.exports = {isLoggedIn}