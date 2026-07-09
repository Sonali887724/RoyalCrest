const params = new URLSearchParams(window.location.search);

const bookingId = params.get("id");

async function loadBooking() {

    try {

        const response = await fetch(`/api/bookings/${bookingId}`);

        const result = await response.json();

        if (!result.success) {

            document.getElementById("bookingCard").innerHTML =
                "<h2>Booking not found</h2>";

            return;

        }

        const booking = result.booking;

        const nights = Math.ceil(
            (new Date(booking.checkOut) - new Date(booking.checkIn))
            / (1000 * 60 * 60 * 24)
        );

        document.getElementById("bookingCard").innerHTML = `

        <div class="booking-details-card">

            <img
                src="/images/${booking.roomId.image}"
                class="room-image"
                alt="${booking.roomId.roomName}"
            >

            <h2>${booking.roomId.roomName}</h2>
            

            <h2>${booking.roomId.roomName}</h2>

            <p><strong>Booking ID:</strong> ${booking._id}</p>

            <p><strong>Booking Date:</strong>
            ${new Date(booking.createdAt).toLocaleDateString()}
            </p>

            <span class="status ${booking.status.toLowerCase()}">
                ${booking.status}
            </span>

            <hr>

            <h3>Guest Information</h3>

            <p><strong>Name:</strong> ${booking.guestId.name}</p>

            <p><strong>Email:</strong> ${booking.guestId.email}</p>

            <p><strong>Phone:</strong> ${booking.guestId.phone}</p>

            <hr>

            <h3>Room Information</h3>

            <p><strong>Room Type:</strong> ${booking.roomId.roomType}</p>

            <p><strong>Capacity:</strong> ${booking.roomId.capacity}</p>

            <hr>

            <h3>Booking Information</h3>

            <p><strong>Check In:</strong>
            ${new Date(booking.checkIn).toLocaleDateString()}</p>

            <p><strong>Check Out:</strong>
            ${new Date(booking.checkOut).toLocaleDateString()}</p>


            <p><strong>Stay Duration:</strong> ${nights} Night(s)</p>

            <p><strong>Guests:</strong>
            ${booking.guests}</p>

            <p><strong>Total Price:</strong>
            ₹${booking.totalPrice}</p>

            <hr>

        <h3>Payment Information</h3>

        <p><strong>Payment Status:</strong>
        ${booking.paymentStatus || "Pending"}
        </p>

        <p><strong>Payment ID:</strong>
        ${booking.paymentId || "Not Available"}
        </p>

        <p><strong>Order ID:</strong>
        ${booking.orderId || "Not Available"}
        </p>

        </div>

        `;

    }

    catch (error) {

        console.log(error);

    }

}

loadBooking();

loadBooking();

const invoiceBtn = document.getElementById("downloadInvoiceBtn");

if (invoiceBtn) {

    invoiceBtn.addEventListener("click", () => {

        window.location.href = `/api/invoice/${bookingId}`;

    });

}