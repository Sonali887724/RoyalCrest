const Razorpay = require("razorpay");

const razorpay = new Razorpay({

    key_id: process.env.RAZORPAY_KEY_ID,

    key_secret: process.env.RAZORPAY_KEY_SECRET

});

const createOrder = async (req, res) => {

    try {

        const { amount } = req.body;

        const options = {

            amount: amount * 100, // Convert ₹ to paise

            currency: "INR",

            receipt: "receipt_" + Date.now()

        };

        const order = await razorpay.orders.create(options);

        res.json({

            success: true,

            order

        });

    }

    catch (error) {

        console.log(error);

        res.status(500).json({

            success: false,

            message: "Unable to create payment order."

        });

    }

};

module.exports = {

    createOrder

};