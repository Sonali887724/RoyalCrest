const express = require("express");

const router = express.Router();

const {
    // registerAdmin,
    loginAdmin
} = require("../controllers/adminController");

// Register
// router.post("/register", registerAdmin);

// Login
router.post("/login", loginAdmin);

module.exports = router;