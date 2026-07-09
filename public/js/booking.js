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
        calculateTotal();

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

    if (!checkIn || !checkOut) {

        totalDaysText.textContent = "Total Days: 0";
        totalAmountText.textContent = "Total Amount: ₹0";

        return;
    }

    const start = new Date(checkIn);
    const end = new Date(checkOut);

    let days = Math.ceil((end - start) / (1000 * 60 * 60 * 24));

    if (days <= 0) {

        days = 1;

    }

    const total = days * roomPrice;

    roomPriceText.textContent = `Room Price: ₹${roomPrice}`;
    totalDaysText.textContent = `Total Days: ${days}`;
    totalAmountText.textContent = `Total Amount: ₹${total}`;

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

        // Create Razorpay Order
        const orderResponse = await fetch("/api/payment/create-order", {

            method: "POST",

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify({

                amount: bookingData.totalPrice

            })

        });

        const orderData = await orderResponse.json();

        if (!orderData.success) {

            alert("Unable to start payment.");

            return;

        }

        const options = {

            key: "rzp_test_TAxuoScXZBdjIt", // Replace with your Razorpay key

            amount: orderData.order.amount,

            currency: orderData.order.currency,

            name: "Royal Crest",

            description: "Room Booking Payment",

            order_id: orderData.order.id,

            handler: async function (response) {

                // Payment Successful
                const bookingResponse = await fetch("/api/bookings", {

                    method: "POST",

                    headers: {

                        "Content-Type": "application/json"

                    },

                    body: JSON.stringify({

                        ...bookingData,

                        paymentId: response.razorpay_payment_id,

                        orderId: response.razorpay_order_id,

                        paymentStatus: "Paid"

                    })

                });

                const bookingResult = await bookingResponse.json();

                if (bookingResult.success) {

                    window.location.href =
                        `booking-success.html?id=${bookingResult.booking._id}`;

                }

                else {

                    alert("Booking could not be saved.");

                }

            },

            theme: {

                color: "#0b3b66"

            }

        };

        const rzp = new Razorpay(options);

        rzp.open();

    }

    catch (error) {

        console.log(error);

        alert("Payment failed.");

    }

});

