if(localStorage.getItem("adminLoggedIn") !== "true"){

    window.location.href = "admin-login.html";

}


async function loadDashboard() {

    try {

        // Rooms
        const roomResponse = await fetch("/api/rooms");
        const rooms = await roomResponse.json();

        document.getElementById("totalRooms").textContent = rooms.length;

        const available = rooms.filter(room => room.available).length;

        document.getElementById("availableRooms").textContent = available;

        document.getElementById("bookedRooms").textContent =
            rooms.length - available;

        // Bookings
        const bookingResponse = await fetch("/api/bookings");
        const bookings = await bookingResponse.json();

        document.getElementById("totalBookings").textContent =
            bookings.length;
        
            
        const recentBody = document.getElementById("recentBookingsBody");

recentBody.innerHTML = "";

bookings.slice(0,5).forEach(booking=>{

    recentBody.innerHTML += `

        <tr>

            <td>${booking.customerName}</td>

            <td>${booking.roomName}</td>

            <td>${booking.checkInDate}</td>

            <td>

                <span style="color:#2ecc71;">

                    Confirmed

                </span>

            </td>

        </tr>

    `;

});    

        // ✅ Add these lines
        let revenue = 0;

        bookings.forEach(booking => {

            revenue += booking.totalPrice;

        });

        document.getElementById("totalRevenue").textContent =
            "₹" + revenue.toLocaleString("en-IN");

    } catch (error) {

        console.error(error);

    }

}

loadDashboard();

function setActiveMenu(id){

    document.querySelectorAll(".sidebar a").forEach(link=>{

        link.classList.remove("active");

    });

    document.getElementById(id).classList.add("active");

}

async function showRooms() {

    const response = await fetch("/api/rooms");

    const rooms = await response.json();

    document.getElementById("contentArea").innerHTML = `

        <div class="section-header">

    <h2>Manage Rooms</h2>

    <div class="header-actions">

        <input
            type="text"
            id="searchRoom"
            class="searchBox"
            placeholder="🔍 Search Room Name or Type">

            <button class="goldBtn" onclick="showAddRoomForm()">
                <i class="fa-solid fa-plus"></i>
                    Add Room
            </button>

    </div>

</div>

        <div id="roomsTable"></div>

    `;

    displayRooms(rooms);

    document.getElementById("searchRoom").addEventListener("input", function () {

        const keyword = this.value.toLowerCase();

        const filteredRooms = rooms.filter(room =>

            room.roomName.toLowerCase().includes(keyword) ||

            room.roomType.toLowerCase().includes(keyword)

        );

        displayRooms(filteredRooms);

    });

}

function displayRooms(rooms){

    document.getElementById("roomsTable").innerHTML=`

    <table class="roomTable">

        <thead>

            <tr>

                <th>ID</th>

                <th>Room</th>

                <th>Type</th>

                <th>Price</th>

                <th>Status</th>

                <th>Action</th>

            </tr>

        </thead>

        <tbody>

        ${
            rooms.map(room=>`

            <tr>

                <td>${room._id}</td>

                <td>${room.roomName}</td>

                <td>${room.roomType}</td>

                <td>₹${room.price}</td>

                <td>

                    ${
                        room.available

                        ?

                        `<span class="status available">Available</span>`

                        :

                        `<span class="status booked">Booked</span>`

                    }

                </td>

                <td>

                    <button class="editBtn"

                        onclick="editRoom('${room._id}')">

                        <i class="fa-solid fa-pen"></i>

                    </button>

                    <button class="deleteBtn"

                        onclick="deleteRoom('${room._id}')">

                        <i class="fa-solid fa-trash"></i>

                    </button>

                </td>

            </tr>

            `).join("")
        }

        </tbody>

    </table>

    `;
}

document.getElementById("roomsLink").addEventListener("click", (e) => {

    e.preventDefault();

    showRooms();

});

function showAddRoomForm() {

    document.getElementById("contentArea").innerHTML = `

        <h2>Add New Room</h2>

    <div class = "roomFormCard">

        <form id="roomForm">

        <div class="roomGrid">


            <input
                type="text"
                id="roomName"
                placeholder="Room Name"
                required
            >

            <input
                type="text"
                id="roomType"
                placeholder="Room Type"
                required
            >

            <input
                type="number"
                id="price"
                placeholder="Price"
                required
            >

            <input
                type="number"
                id="capacity"
                placeholder="Capacity"
                required
            >

            <input
                type="text"
                id="image"
                placeholder="Image Name (example: room1.jpg)"
                required
            >

        </div>

            <textarea
                id="description"
                placeholder="Room Description"
                rows="4"
                required
            ></textarea>

            <label>

                <input
                    type="checkbox"
                    id="available"
                    checked
                >

                Available

            </label>

            <br><br>

            <button type="submit">
                Save Room
            </button>

            <button
                type="button"
                onclick="showRooms()"
            >
                Cancel
            </button>

        </form>
    </div>

    `;

    document
        .getElementById("roomForm")
        .addEventListener("submit", addRoom);

}

async function addRoom(e) {

    e.preventDefault();

    const room = {

        roomName: document.getElementById("roomName").value,

        roomType: document.getElementById("roomType").value,

        price: Number(document.getElementById("price").value),

        capacity: Number(document.getElementById("capacity").value),

        image: document.getElementById("image").value,

        description: document.getElementById("description").value,

        available: document.getElementById("available").checked

    };

    const response = await fetch("/api/rooms", {

        method: "POST",

        headers: {

            "Content-Type": "application/json"

        },

        body: JSON.stringify(room)

    });

    const result = await response.json();

    if(result.success){

        alert("Room Added Successfully!");

        showRooms();

    }

    else{

        alert(result.message);

    }

}

async function editRoom(id) {

    try {

        const response = await fetch(`/api/rooms/${id}`);
        const room = await response.json();

        document.getElementById("contentArea").innerHTML = `

            <h2>Edit Room</h2>

            <form id="editRoomForm">

                <input
                    type="text"
                    id="roomName"
                    value="${room.roomName}"
                    required
                >

                <input
                    type="text"
                    id="roomType"
                    value="${room.roomType}"
                    required
                >

                <input
                    type="number"
                    id="price"
                    value="${room.price}"
                    required
                >

                <input
                    type="number"
                    id="capacity"
                    value="${room.capacity}"
                    required
                >

                <input
                    type="text"
                    id="image"
                    value="${room.image}"
                    required
                >

                <textarea
                    id="description"
                    rows="4"
                    required
                >${room.description}</textarea>

                <label>

                    <input
                        type="checkbox"
                        id="available"
                        ${room.available ? "checked" : ""}

                    >

                    Available

                </label>

                <br><br>

                <button type="submit">

                    Update Room

                </button>

                <button
                    type="button"
                    onclick="showRooms()"
                >

                    Cancel

                </button>

            </form>

        `;

        document
            .getElementById("editRoomForm")
            .addEventListener("submit", (e) => updateRoom(e, id));

    } catch (error) {

        console.error(error);

    }

}

async function updateRoom(e, id) {

    e.preventDefault();

    const room = {

        roomName: document.getElementById("roomName").value,

        roomType: document.getElementById("roomType").value,

        price: Number(document.getElementById("price").value),

        capacity: Number(document.getElementById("capacity").value),

        image: document.getElementById("image").value,

        description: document.getElementById("description").value,

        available: document.getElementById("available").checked

    };

    const response = await fetch(`/api/rooms/${id}`, {

        method: "PUT",

        headers: {

            "Content-Type": "application/json"

        },

        body: JSON.stringify(room)

    });

    const result = await response.json();

    if (result.success) {

        alert("Room Updated Successfully!");

        showRooms();

    } else {

        alert(result.message);

    }

}

async function deleteRoom(id) {

    const confirmDelete = confirm(
        "Are you sure you want to delete this room?"
    );

    if (!confirmDelete) {

        return;

    }

    try {

        const response = await fetch(`/api/rooms/${id}`, {

            method: "DELETE"

        });

        const result = await response.json();

        if (result.success) {

            alert("Room deleted successfully!");

            showRooms();

        } else {

            alert(result.message);

        }

    } catch (error) {

        console.error(error);

        alert("Something went wrong!");

    }

}



async function showBookings() {

    try {

        const response = await fetch("/api/bookings");

        const bookings = await response.json();

        let html = `

            <h2>Booking Management</h2>

            <table class="booking-table">

                <thead>

                    <tr>

                        <th>Customer</th>

                        <th>Room</th>

                        <th>Email</th>

                        <th>Phone</th>

                        <th>Check In</th>

                        <th>Check Out</th>

                        <th>Guests</th>

                        <th>Amount</th>

                        <th>Action</th>

                    </tr>

                </thead>

                <tbody>

        `;

        bookings.forEach(booking => {

            html += `

                <tr>

                    <td>${booking.customerName}</td>

                    <td>${booking.roomId ? booking.roomId.roomName : "Room Deleted"}</td>

                    <td>${booking.email}</td>

                    <td>${booking.phone}</td>

                    <td>${booking.checkIn.substring(0,10)}</td>

                    <td>${booking.checkOut.substring(0,10)}</td>

                    <td>${booking.guests}</td>

                    <td>₹${booking.totalPrice}</td>

                    <td>

                        <button
                            onclick="deleteBooking('${booking._id}')"
                        >
                            Cancel
                        </button>

                    </td>

                </tr>

            `;

        });

        html += `

                </tbody>

            </table>

        `;

        document.getElementById("contentArea").innerHTML = html;

    }

    catch(error){

    alert(error.message);
    console.error(error);

}
}

document.getElementById("roomsLink").addEventListener("click", (e) => {
    e.preventDefault();
    showRooms();
});

document.getElementById("bookingsLink").addEventListener("click", (e) => {
    e.preventDefault();
    showBookings();
});

async function deleteBooking(id) {

    const confirmDelete = confirm(
        "Are you sure you want to cancel this booking?"
    );

    if (!confirmDelete) return;

    try {

        const response = await fetch(`/api/bookings/${id}`, {

            method: "DELETE"

        });

        const result = await response.json();

        if (result.success) {

            alert("Booking cancelled successfully!");

            showBookings();

            loadDashboard();

        } else {

            alert(result.message);

        }

    } catch (error) {

        console.error(error);

    }

}
document.getElementById("dashboardLink").addEventListener("click",(e)=>{

    e.preventDefault();

    setActiveMenu("dashboardLink");

    loadDashboard();

    document.getElementById("contentArea").innerHTML="";

});

document.getElementById("roomsLink").addEventListener("click",(e)=>{

    e.preventDefault();

    setActiveMenu("roomsLink");

    showRooms();

});

document.getElementById("bookingsLink").addEventListener("click",(e)=>{

    e.preventDefault();

    setActiveMenu("bookingsLink");

    showBookings();

});

setActiveMenu("dashboardLink");

const logoutLink = document.getElementById("logoutLink");

if (logoutLink) {

    logoutLink.addEventListener("click", (e) => {

        e.preventDefault();

        if (confirm("Are you sure you want to logout?")) {

            localStorage.removeItem("adminLoggedIn");

            window.location.href = "admin-login.html";

        }

    });

}

document.getElementById("addRoomBtn").onclick = () => {

    showRooms();

};

document.getElementById("manageRoomBtn").onclick = () => {

    showRooms();

};