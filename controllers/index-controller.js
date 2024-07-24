const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const UserModel = require('../models/user-model');
const userModel = require('../models/user-model');


module.exports.homePageController = (req, res) => {
    let message = req.flash("error")
    res.render("index")
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

module.exports.profilePageController = (req, res) => {
    res.render("profile")
}