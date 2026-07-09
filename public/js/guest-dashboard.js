// Check whether guest is logged in
const guestId = localStorage.getItem("guestId");
const guestName = localStorage.getItem("guestName");

if (!guestId) {

    alert("Please login first.");

    window.location.href = "guest-login.html";

}

// Show guest name
const welcomeText = document.getElementById("welcomeText");

welcomeText.innerHTML = `Welcome, ${guestName} 👋`;


// Load latest booking
async function loadRecentBooking() {

    try {

        const response = await fetch(`/api/bookings/guest/${guestId}`);

        const result = await response.json();

        const recentBooking = document.getElementById("recentBooking");

        if (!result.success || result.bookings.length === 0) {

            recentBooking.innerHTML = `
                <p>No bookings yet.</p>
            `;

            return;

        }

        const booking = result.bookings[0];

        recentBooking.innerHTML = `

            <div class="recent-booking-card">

                <div class="booking-header">
                    <i class="fa-solid fa-hotel"></i>
                    <h3>${booking.roomId.roomName}</h3>
                </div>

                <div class="booking-details">

                    <p><strong>Status:</strong>
                        <span class="status">${booking.status}</span>
                    </p>

                    <p><strong>Check In:</strong>
                        ${new Date(booking.checkIn).toLocaleDateString()}
                    </p>

                    <p><strong>Check Out:</strong>
                        ${new Date(booking.checkOut).toLocaleDateString()}
                    </p>

                    <p class="price">
                        ₹${booking.totalPrice}
                    </p>

                </div>

            </div>

            `;
    }

    catch(error){

        console.log(error);

    }

}

async function loadBookingSummary() {

    try {

        const response = await fetch(`/api/bookings/guest/${guestId}`);

        const result = await response.json();

        if (!result.success) return;

        const bookings = result.bookings;

        console.log(bookings);

        // Total Bookings
        document.getElementById("totalBookings").textContent =
            bookings.length;

        // Active Bookings
        const active = bookings.filter(
            booking => booking.status === "Confirmed" ||
                       booking.status === "Pending"
        ).length;

        document.getElementById("activeBookings").textContent =
            active;

        // Cancelled Bookings
        const cancelled = bookings.filter(
            booking => booking.status === "Cancelled"
        ).length;

        document.getElementById("cancelledBookings").textContent =
            cancelled;

        // Total Amount Spent
        let total = 0;

        bookings.forEach(booking => {

            total += booking.totalPrice;

        });

        document.getElementById("totalSpent").textContent =
            "₹" + total.toLocaleString("en-IN");

    }

    catch(error){

        console.error(error);

    }

}




loadRecentBooking();

loadBookingSummary();



async function loadRecommendedRooms() {

    try {

        const response = await fetch("/api/rooms");

        const result = await response.json();

        const container = document.getElementById("recommendedRooms");

        container.innerHTML = "";

        result.slice(0,3).forEach(room=>{

            container.innerHTML += `

            <div class="room-card">

                <img src="/images/${room.image}" alt="${room.roomName}">

                <div class="room-info">

                    <h3>${room.roomName}</h3>

                    <p>${room.roomType}</p>

                    <h2>₹${room.price}</h2>

                    <button
                        onclick="location.href='booking.html?room=${room._id}'">

                        Book Now

                    </button>

                </div>

            </div>

            `;

        });

    }

    catch(error){

        console.log(error);

    }

}

loadRecommendedRooms();


// Logout
function logoutGuest(){

    localStorage.removeItem("guest");
    localStorage.removeItem("guestId");
    localStorage.removeItem("guestName");

    alert("Logged out successfully.");

    window.location.href = "index.html";

}

async function loadProfile() {

    try {

        const response = await fetch(`/api/guests/profile/${guestId}`);

        const result = await response.json();

        if (!result.success) return;

        document.getElementById("profileName").textContent =
            result.guest.name;

        document.getElementById("profileEmail").textContent =
            result.guest.email;

        document.getElementById("profilePhone").textContent =
            result.guest.phone;
        document.getElementById("profileImage").src =
         `/uploads/${result.guest.profileImage}`;    

        document.getElementById("profileDate").textContent =
            new Date(result.guest.createdAt).toLocaleDateString();

    }

    catch(error){

        console.error(error);

    }

}

loadProfile();

document.getElementById("imageInput").addEventListener("change", uploadImage);

async function uploadImage() {

    const file = document.getElementById("imageInput").files[0];

    if (!file) return;

    const formData = new FormData();

    formData.append("profileImage", file);

    try {

        const response = await fetch(
            `/api/guests/upload-photo/${guestId}`,
            {
                method: "POST",
                body: formData
            }
        );

        const result = await response.json();

        if (result.success) {

            document.getElementById("profileImage").src =
                `/uploads/${result.profileImage}?t=${Date.now()}`;

            alert("Profile photo updated successfully!");

        } else {

            alert(result.message);

        }

    } catch (error) {

        console.error(error);

        alert("Failed to upload image.");

    }

}

