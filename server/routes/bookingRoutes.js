const express = require("express");
const router = express.Router();

const {
    createBooking,
    getAllBookings,
    getGuestBookings,
    getBookingById,
    cancelBooking
} = require("../controllers/bookingController");

router.post("/", createBooking);
router.get("/", getAllBookings);
router.get("/guest/:guestId", getGuestBookings);
router.get("/:id", getBookingById);
router.delete("/:id", cancelBooking);

module.exports = router;