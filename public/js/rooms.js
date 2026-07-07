const roomContainer = document.getElementById("rooms");

async function loadRooms() {
    try {
        const response = await fetch("/api/rooms");
        const rooms = await response.json();

        displayRooms(rooms);
    } catch (error) {
        console.error(error);
    }
}

function displayRooms(rooms) {
    roomContainer.innerHTML = "";

    rooms.forEach(room => {
        roomContainer.innerHTML += `
            <div class="room-card">
                <img src="images/${room.image}" alt="${room.roomName}">

                <div class="room-info">
                    <h3>${room.roomName}</h3>

                    <p>${room.description}</p>

                    <p><strong>₹${room.price} / Night</strong></p>

                    <a href="booking.html?roomId=${room._id}">
                        Book Now
                    </a>
                </div>
            </div>
        `;
    });
}

loadRooms();