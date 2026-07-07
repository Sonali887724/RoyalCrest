const Room = require("../models/Room");

// ===============================
// GET ALL ROOMS
// ===============================

const getAllRooms = async (req, res) => {

    try {

        const rooms = await Room.find();

        res.status(200).json(rooms);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

// ===============================
// GET SINGLE ROOM
// ===============================


const getRoomById = async (req, res) => {
    try {

        const room = await Room.findById(req.params.id);

        if (!room) {
            return res.status(404).json({
                success: false,
                message: "Room not found"
            });
        }

        res.status(200).json(room);

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};


// ===============================
// UPDATE ROOM
// ===============================

const updateRoom = async (req, res) => {
    try {

        // Automatically add "images/" before image name
        if (req.body.image && !req.body.image.startsWith("images/")) {
            req.body.image = "images/" + req.body.image;
        }

        const room = await Room.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!room) {
            return res.status(404).json({
                success: false,
                message: "Room not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Room Updated Successfully",
            room
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

// ===============================
// DELETE ROOM
// ===============================

const deleteRoom = async (req, res) => {
    try {

        const room = await Room.findByIdAndDelete(req.params.id);

        if (!room) {
            return res.status(404).json({
                success: false,
                message: "Room not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Room Deleted Successfully"
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};
// ===============================
// ADD ROOM
// ===============================

const addRoom = async (req, res) => {

    try {

        // Automatically add "images/" before image name
        if (req.body.image && !req.body.image.startsWith("images/")) {
            req.body.image = "images/" + req.body.image;
        }

        const room = await Room.create(req.body);

        res.status(201).json({

            success: true,

            message: "Room Added Successfully",

            room

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

module.exports = {
    getAllRooms,
    addRoom,
    getRoomById,
    updateRoom,
    deleteRoom
};