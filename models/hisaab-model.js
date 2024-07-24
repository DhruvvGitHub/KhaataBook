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
    data: {
        type: String,
        required: [true, "Data is required"],
        trim: true
    },
    passcode: {
        type: String,
    },
    editable: {
        type: Boolean,
        default: false
    },
    shareable: {
        type: Boolean,
        default: false
    },
    isEncrypted: {
        type: Boolean,
        default: false
    }
},{
    timestamps: true
})

module.exports = mongoose.model("hisaab", hisaabSchema)