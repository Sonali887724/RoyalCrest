const passwordInput = document.getElementById("password");

// Show / Hide Password
document.getElementById("togglePassword").addEventListener("click", () => {

    if (passwordInput.type === "password") {

        passwordInput.type = "text";

        document.getElementById("togglePassword").classList.replace("fa-eye", "fa-eye-slash");

    } else {

        passwordInput.type = "password";

        document.getElementById("togglePassword").classList.replace("fa-eye-slash", "fa-eye");

    }

});

const form = document.getElementById("loginForm");

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const loginData = {

        email: document.getElementById("email").value,

        password: document.getElementById("password").value

    };

    try {

        const response = await fetch("/api/guests/login", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(loginData)

        });

        const result = await response.json();

        if (result.success) {

            localStorage.setItem("guestLoggedIn", "true");
            localStorage.setItem("guestId", result.guest.id);
            localStorage.setItem("guestName", result.guest.name);

            alert("Login Successful!");

            window.location.href = "guest-dashboard.html";

        } else {

            alert(result.message);

        }

    } catch (error) {

        console.error(error);

        alert("Server Error");

    }

});