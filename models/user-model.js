const { required } = require('joi');
const mongoose = require('mongoose');
const { use } = require('../routes/index-router');

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    }
})

module.exports = mongoose.model('user', userSchema);