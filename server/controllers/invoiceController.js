const PDFDocument = require("pdfkit");
const Booking = require("../models/Booking");

const downloadInvoice = async (req, res) => {

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

        const doc = new PDFDocument({

            margin: 50

        });

        res.setHeader(
            "Content-Type",
            "application/pdf"
        );

        res.setHeader(
            "Content-Disposition",
            `attachment; filename=Invoice_${booking._id}.pdf`
        );

        doc.pipe(res);

        // Title
        doc
            .fontSize(24)
            .fillColor("#0b3b66")
            .text("ROYAL CREST HOTEL", {

                align: "center"

            });

        doc.moveDown();

        doc
            .fontSize(18)
            .fillColor("black")
            .text("PAYMENT INVOICE", {

                align: "center"

            });

        doc.moveDown(2);

        doc.fontSize(13);

        doc.text(`Booking ID : ${booking._id}`);
        doc.text(`Payment ID : ${booking.paymentId || "N/A"}`);
        doc.text(`Payment Status : ${booking.paymentStatus || "Pending"}`);

        doc.moveDown();

        doc.text(`Guest Name : ${booking.customerName}`);
        doc.text(`Email : ${booking.email}`);
        doc.text(`Phone : ${booking.phone}`);

        doc.moveDown();

        doc.text(`Room : ${booking.roomId.roomName}`);
        doc.text(`Room Type : ${booking.roomId.roomType}`);

        doc.moveDown();

        doc.text(
            `Check In : ${new Date(booking.checkIn).toLocaleDateString()}`
        );

        doc.text(
            `Check Out : ${new Date(booking.checkOut).toLocaleDateString()}`
        );

        doc.text(`Guests : ${booking.guests}`);

        doc.moveDown();

        doc
            .fontSize(16)
            .text(`Total Paid : ₹${booking.totalPrice}`);

        doc.moveDown(2);

        doc
            .fontSize(12)
            .fillColor("green")
            .text("Thank you for choosing Royal Crest Hotel!");

        doc.end();

    }

    catch (error) {

        console.log(error);

        res.status(500).json({

            success: false,
            message: error.message

        });

    }

};

module.exports = {

    downloadInvoice

};