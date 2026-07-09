const mongoose = require("mongoose");

const guestSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        trim: true
    },

    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },

    phone: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    },

    profileImage: {
        type: String,
        default: "default-avatar.jpg"
    },

    

}, {
    timestamps: true
});

module.exports = mongoose.model("Guest", guestSchema);