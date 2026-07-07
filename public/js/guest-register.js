const passwordInput = document.getElementById("password");
const confirmPasswordInput = document.getElementById("confirmPassword");

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

// Show / Hide Confirm Password
document.getElementById("toggleConfirmPassword").addEventListener("click", () => {

    if (confirmPasswordInput.type === "password") {

        confirmPasswordInput.type = "text";

        document.getElementById("toggleConfirmPassword").classList.replace("fa-eye", "fa-eye-slash");

    } else {

        confirmPasswordInput.type = "password";

        document.getElementById("toggleConfirmPassword").classList.replace("fa-eye-slash", "fa-eye");

    }

});

// Registration
const form = document.getElementById("registerForm");

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    if (passwordInput.value !== confirmPasswordInput.value) {

        alert("Passwords do not match!");

        return;

    }

    const guestData = {

        name: document.getElementById("name").value,

        email: document.getElementById("email").value,

        phone: document.getElementById("phone").value,

        password: passwordInput.value

    };

    try {

        const response = await fetch("/api/guests/register", {

            method: "POST",

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify(guestData)

        });

        const result = await response.json();

        if (result.success) {

            alert("Registration Successful!");

            window.location.href = "guest-login.html";

        } else {

            alert(result.message);

        }

    } catch (error) {

        console.error(error);

        alert("Server Error");

    }

});