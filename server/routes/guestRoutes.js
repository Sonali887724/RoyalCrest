const express = require("express");

const router = express.Router();

const {
    registerGuest,
    loginGuest,
    getGuestProfile
} = require("../controllers/guestController");

router.post("/register", registerGuest);

router.post("/login", loginGuest);

router.get("/profile/:id", getGuestProfile);

module.exports = router;