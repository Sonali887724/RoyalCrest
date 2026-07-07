const Guest = require("../models/Guest");
const bcrypt = require("bcrypt");

// Register Guest
const registerGuest = async (req, res) => {

    try {

        const { name, email, phone, password } = req.body;

        const existingGuest = await Guest.findOne({ email });

        if (existingGuest) {
            return res.json({
                success: false,
                message: "Email already registered"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const guest = new Guest({
            name,
            email,
            phone,
            password: hashedPassword
        });

        await guest.save();

        res.json({
            success: true,
            message: "Registration Successful"
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

// Login Guest
const loginGuest = async (req, res) => {

    try {

        const { email, password } = req.body;

        const guest = await Guest.findOne({ email });

        if (!guest) {

            return res.json({
                success: false,
                message: "Invalid Email"
            });

        }

        const match = await bcrypt.compare(password, guest.password);

        if (!match) {

            return res.json({
                success: false,
                message: "Invalid Password"
            });

        }

        res.json({
            success: true,
            message: "Login Successful",
            guest: {
                id: guest._id,
                name: guest.name,
                email: guest.email
            }
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};


// Get Guest Profile
const getGuestProfile = async (req, res) => {

    try {

        const guest = await Guest.findById(req.params.id).select("-password");

        if (!guest) {

            return res.status(404).json({
                success: false,
                message: "Guest not found"
            });

        }

        res.json({
            success: true,
            guest
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

module.exports = {
    registerGuest,
    loginGuest,
    getGuestProfile
};