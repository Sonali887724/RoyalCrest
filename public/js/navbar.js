document.addEventListener("DOMContentLoaded", () => {

    const loggedIn = localStorage.getItem("guestLoggedIn");

    if (loggedIn === "true") {

        document.getElementById("loginNav").style.display = "none";
        document.getElementById("registerNav").style.display = "none";

        document.getElementById("myBookingsNav").style.display = "block";
        document.getElementById("guestNameNav").style.display = "block";
        document.getElementById("logoutNav").style.display = "block";

        document.getElementById("guestName").innerText =
            "👤 " + localStorage.getItem("guestName");

    }

});

function logoutGuest() {

    localStorage.removeItem("guestLoggedIn");
    localStorage.removeItem("guestId");
    localStorage.removeItem("guestName");

    window.location.href = "index.html";

}