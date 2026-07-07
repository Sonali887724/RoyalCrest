const guestId = localStorage.getItem("guestId");

if (!guestId) {
    alert("Please login first.");
    window.location.href = "guest-login.html";
}

async function loadBookings() {

    try {

        const response = await fetch(`/api/bookings/guest/${guestId}`);
        const result = await response.json();

        const container = document.getElementById("bookingsContainer");

        container.innerHTML = "";

        if (result.bookings.length === 0) {

            container.innerHTML = "<h3>No Bookings Found</h3>";
            return;

        }

        result.bookings.forEach(booking => {

            let statusClass = "";

            if (booking.status === "Pending") {
                statusClass = "pending";
            }
            else if (booking.status === "Confirmed") {
                statusClass = "confirmed";
            }
            else if (booking.status === "Cancelled") {
                statusClass = "cancelled";
            }
            else if (booking.status === "Checked In") {
                statusClass = "confirmed";
            }
            else if (booking.status === "Checked Out") {
                statusClass = "confirmed";
            }

            container.innerHTML += `

            <div class="booking-card">

                <img
                    class="room-image"
                    src="${booking.roomId.image}"
                    alt="${booking.roomId.roomName}"
                >

                <div class="booking-content">

                    <div class="booking-header">

                        <h3>${booking.roomId.roomName}</h3>

                        <span class="status ${statusClass}">
                            ${booking.status}
                        </span>

                    </div>

                    <div class="booking-details">

                        <p>
                            📅 <strong>Check In:</strong><br>
                            ${new Date(booking.checkIn).toLocaleDateString()}
                        </p>

                        <p>
                            📅 <strong>Check Out:</strong><br>
                            ${new Date(booking.checkOut).toLocaleDateString()}
                        </p>

                        <p>
                            👥 <strong>Guests:</strong><br>
                            ${booking.guests}
                        </p>

                        <p>
                            💰 <strong>Total:</strong><br>
                            ₹${booking.totalPrice}
                        </p>

                    </div>

                    <div class="buttons">

                        <button
                            class="view-btn"
                            onclick="viewBooking('${booking._id}')">

                            View Details

                        </button>

                        ${
                            booking.status !== "Cancelled"
                            ? `
                            <button
                                class="cancel-btn"
                                onclick="cancelBooking('${booking._id}')">

                                Cancel Booking

                            </button>
                            `
                            : ""
                        }

                    </div>

                </div>

            </div>

            `;

        });

    } catch (error) {

        console.error(error);

    }

}

loadBookings();

async function cancelBooking(id) {

    if (!confirm("Cancel this booking?")) return;

    const response = await fetch(`/api/bookings/${id}`, {
        method: "DELETE"
    });

    const result = await response.json();

    alert(result.message);

    loadBookings();

}

function viewBooking(id) {

    alert("Booking ID : " + id);

}