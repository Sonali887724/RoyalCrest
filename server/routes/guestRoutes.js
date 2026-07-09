const express = require("express");

const router = express.Router();
const upload = require("../middleware/upload");

const {
    registerGuest,
    loginGuest,
    getGuestProfile,
    uploadProfileImage,
    updateGuestProfile,
    changePassword,
    getAllGuests
} = require("../controllers/guestController");


router.post("/register", registerGuest);

router.post("/login", loginGuest);

router.get("/profile/:id", getGuestProfile);

router.post(
    "/upload-photo/:id",
    upload.single("profileImage"),
    uploadProfileImage
);
router.put(
    "/update-profile/:id",
    updateGuestProfile
);

router.put(
    "/change-password/:id",
    changePassword
);

router.get("/", getAllGuests);

module.exports = router;