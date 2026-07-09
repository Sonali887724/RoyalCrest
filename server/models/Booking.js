const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
{
    customerName: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    phone: {
        type: String,
        required: true
    },

    guestId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Guest",
    required: true
    },

    roomId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Room",
        required: true
    },

    checkIn: {
        type: Date,
        required: true
    },

    checkOut: {
        type: Date,
        required: true
    },

    guests: {
        type: Number,
        required: true
    },

    totalPrice: {
        type: Number,
        default: 0
    },

    paymentId: {
    type: String
},

    orderId: {
        type: String
    },

    paymentStatus: {
        type: String,
        enum: ["Pending", "Paid", "Failed"],
        default: "Pending"
    },

    status: {
    type: String,
    enum: [
        "Pending",
        "Confirmed",
        "Checked In",
        "Checked Out",
        "Cancelled"
    ],
    default: "Pending"
},

},
{
    timestamps: true
});

module.exports = mongoose.model("Booking", bookingSchema);