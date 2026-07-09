const Booking = require("../models/Booking");

// ===============================
// CREATE BOOKING
// ===============================

const createBooking = async (req, res) => {

    try {

        const bookingData = {

            ...req.body,

            status: "Confirmed"

        };

        const booking = await Booking.create(bookingData);

        res.status(201).json({

            success: true,

            message: "Booking Created Successfully",

            booking

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};



// ===============================
// GET ALL BOOKINGS
// ===============================

const getAllBookings = async (req, res) => {
    try {

        const bookings = await Booking.find()
            .populate("roomId");

        res.status(200).json(bookings);

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};


// ===============================
// GET BOOKINGS OF LOGGED-IN GUEST
// ===============================

const getGuestBookings = async (req, res) => {

    try {

        const bookings = await Booking.find({
            guestId: req.params.guestId
        }).populate("roomId");

        res.status(200).json({
            success: true,
            bookings
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};


const cancelBooking = async (req, res) => {

    try {

        const booking = await Booking.findByIdAndUpdate(

            req.params.id,

            {
                status: "Cancelled"
            },

            {
                new: true
            }

        );

        if (!booking) {

            return res.status(404).json({

                success: false,

                message: "Booking not found"

            });

        }

        res.json({

            success: true,

            message: "Booking Cancelled Successfully"

        });

    }

    catch(error){

        res.status(500).json({

            success:false,

            message:error.message

        });

    }

};

// ===============================
// GET SINGLE BOOKING
// ===============================

const getBookingById = async (req, res) => {

    try {

        const booking = await Booking.findById(req.params.id)
            .populate("roomId")
            .populate("guestId");

        if (!booking) {

            return res.status(404).json({

                success: false,

                message: "Booking not found"

            });

        }

        res.status(200).json({

            success: true,

            booking

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};
module.exports = {
    createBooking,
    getAllBookings,
    getGuestBookings,
    getBookingById,
    cancelBooking
};
    