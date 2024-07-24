const mongoose = require('mongoose');

const hisaabSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    title: {
        type: String,
        required: [true, "Title is required"],
        trim: true 
    },
    description: {
        type: String,
        required: [true, "Data is required"],
        trim: true
    },
    encrypted: {
        type: Boolean,
        default: false
    },
    passcode: {
        type: String,
    },
    shareable: {
        type: Boolean,
        default: false
    },
    editable: {
        type: Boolean,
        default: false
    }
},{
    timestamps: true
})

module.exports = mongoose.model("hisaab", hisaabSchema)