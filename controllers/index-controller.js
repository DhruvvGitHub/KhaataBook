const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const userModel = require('../models/user-model');
const { isLoggedIn } = require('../middlewares/isLoggedIn');
const hisaabModel = require('../models/hisaab-model');


module.exports.homePageController = (req, res) => {
    let error = req.flash("error")
    res.render("index", { error })
}

module.exports.homeLoginController = async (req, res) => {
    let { username, password } = req.body

    if(!username || !password) {
        req.flash("error", "All fields are required")
    }

    const user = await userModel.findOne({ username })

    if(!user) {
        req.flash("error", "This username does not exist. Please register")
        return res.redirect("/")
    }

    const correctPassword = await bcrypt.compare(password, user.password)
    if(correctPassword) {
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY)
        res.cookie("token", token)
        return res.redirect("/profile")
    } else {
        req.flash("error", "Username or password is incorrect")
        return res.redirect("/")
    }
}

module.exports.registerPageController = (req, res) => {
    let error = req.flash("error");
    res.render("register", { error });
};

module.exports.registerController = async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        req.flash("error", "All fields are required");
        return res.redirect("/register");
    }

    const existingUser = await userModel.findOne({ email }) 
    if(existingUser) {
        req.flash("error", "This email is already registered. Please login");
        return res.redirect("/register");
    }

    const sameUsername = await userModel.findOne({ username })
    if(sameUsername) {
        req.flash("error", "Username is taken. Choose another")
        return res.redirect("/register");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    const user = new userModel({
        username,
        email,
        password: hashedPassword 
    })
    await user.save()
    
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY)
    res.cookie("token", token)
    return res.redirect("/profile")
    
};

module.exports.profilePageController = async (req, res) => {
    const userId = req.user.id;

    const user = await userModel.findOne({ _id: userId })

    const hisaabs = await hisaabModel.find({
        user: user._id
    })

    res.render("profile", { isLoggedIn: true, user, hisaabs })
}

module.exports.logoutController = (req, res) => {
    res.clearCookie("token")
    return res.redirect("/")
}