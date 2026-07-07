const Admin = require("../models/Admin");
const bcrypt = require("bcrypt");

// Register Admin
const registerAdmin = async (req, res) => {

    try {

        const { username, email, password } = req.body;

        const existingAdmin = await Admin.findOne({
            $or: [{ email }, { username }]
        });

        if (existingAdmin) {
            return res.json({
                success: false,
                message: "Admin already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const admin = new Admin({

            username,
            email,
            password: hashedPassword

        });

        await admin.save();

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

// Login Admin
const loginAdmin = async (req, res) => {

    try {

        const { username, password } = req.body;

        const admin = await Admin.findOne({ username });

        if (!admin) {
            return res.json({
                success: false,
                message: "Invalid Username"
            });
        }

        const match = await bcrypt.compare(password, admin.password);

        if (!match) {
            return res.json({
                success: false,
                message: "Invalid Password"
            });
        }

        // ✅ Successful Login
        res.json({
            success: true,
            message: "Login Successful",
            admin: {
                username: admin.username
            }
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};



module.exports = {

    registerAdmin,
    loginAdmin

};