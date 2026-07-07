const params = new URLSearchParams(window.location.search);
const roomId = params.get("roomId");
const guestId = localStorage.getItem("guestId");
const guestName = localStorage.getItem("guestName");

const bookingForm = document.getElementById("bookingForm");

const roomPriceText = document.getElementById("roomPrice");
const totalDaysText = document.getElementById("totalDays");
const totalAmountText = document.getElementById("totalAmount");

let roomPrice = 0;



// Load Guest Profile
async function loadGuestProfile() {

    try {

        const response = await fetch(`/api/guests/profile/${guestId}`);

        const result = await response.json();

        if (result.success) {

            document.getElementById("customerName").value = result.guest.name;
            document.getElementById("email").value = result.guest.email;
            document.getElementById("phone").value = result.guest.phone;

            document.getElementById("customerName").readOnly = true;
            document.getElementById("email").readOnly = true;
            document.getElementById("phone").readOnly = true;

        }

    } catch (error) {

        console.error(error);

    }

}

// Load selected room
async function loadRoom() {
    try {
        const response = await fetch(`/api/rooms/${roomId}`);
        const room = await response.json();

        roomPrice = room.price;

        roomPriceText.textContent = `Room Price: ₹${roomPrice} / Night`;

    } catch (error) {
        console.error(error);
    }
}

if (!guestId) {

    alert("Please login first.");

    window.location.href = "guest-login.html";

}

loadRoom();
loadGuestProfile();

// Calculate booking summary
function calculateTotal() {

    const checkIn = document.getElementById("checkIn").value;
    const checkOut = document.getElementById("checkOut").value;

    if (!checkIn || !checkOut) return;

    const days = Math.ceil(
        (new Date(checkOut) - new Date(checkIn)) /
        (1000 * 60 * 60 * 24)
    );

    const total = days * roomPrice;

    document.getElementById("bookingSummary").innerHTML = `
        <h3>Booking Summary</h3>
        <p><strong>Room Price:</strong> ₹${roomPrice}</p>
        <p><strong>Total Days:</strong> ${days}</p>
        <p><strong>Total Amount:</strong> ₹${total}</p>
    `;
}

document.getElementById("checkIn").addEventListener("change", calculateTotal);
document.getElementById("checkOut").addEventListener("change", calculateTotal);

// Submit booking
bookingForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    const checkIn = document.getElementById("checkIn").value;
    const checkOut = document.getElementById("checkOut").value;

    const days = Math.ceil(
        (new Date(checkOut) - new Date(checkIn)) /
        (1000 * 60 * 60 * 24)
    );

    const bookingData = {

        customerName: document.getElementById("customerName").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
        roomId,
        guestId,
        checkIn,
        checkOut,
        guests: Number(document.getElementById("guests").value),
        totalPrice: roomPrice * days

    };

    try {

        const response = await fetch("/api/bookings", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(bookingData)
        });

        const result = await response.json();

        if (result.success) {

            window.location.href = "booking-success.html";

        } else {

            alert(result.message);

        }

    } catch (error) {

        console.error(error);

    }

});

