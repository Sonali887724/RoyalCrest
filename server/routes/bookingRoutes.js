const express = require("express");
const router = express.Router();

const {
    createBooking,
    getAllBookings,
    getGuestBookings,
    cancelBooking
} = require("../controllers/bookingController");

router.post("/", createBooking);
router.get("/", getAllBookings);
router.get("/guest/:guestId", getGuestBookings);
router.delete("/:id", cancelBooking);

module.exports = router;