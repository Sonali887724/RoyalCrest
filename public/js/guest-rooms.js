async function loadRooms() {

    try {

        const response = await fetch("/api/rooms");

        const rooms = await response.json();

        const container = document.getElementById("roomsContainer");

        container.innerHTML = "";

        // If your API returns {success:true, rooms:[...]}
        const roomList = rooms.rooms || rooms;

        const availableRooms = roomList.filter(room => room.available);

        if (availableRooms.length === 0) {

            container.innerHTML = "<h2>No Rooms Available</h2>";

            return;

        }

        availableRooms.forEach(room => {

            container.innerHTML += `

                <div class="room-card">

                    <img src="/images/${room.image}" alt="${room.roomName}">

                    <div class="room-content">

                        <h2>${room.roomName}</h2>

                        <p class="room-type">
                            <strong>Type:</strong> ${room.roomType}
                        </p>

                        <p class="capacity">
                            <strong>Capacity:</strong> ${room.capacity} Guests
                        </p>

                        <p class="description">
                            ${room.description}
                        </p>

                        <div class="price">
                            ₹${room.price} / Night
                        </div>

                        <button
                            class="book-btn"
                            onclick="bookRoom('${room._id}')">

                            Book Now

                        </button>

                    </div>

                </div>

            `;

        });

    }

    catch (error) {

        console.error(error);

    }

}

function bookRoom(id){

    window.location.href = `booking.html?roomId=${id}`;

}

loadRooms();