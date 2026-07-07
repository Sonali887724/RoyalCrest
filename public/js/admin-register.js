const passwordInput = document.getElementById("password");

const confirmPasswordInput = document.getElementById("confirmPassword");

document.getElementById("togglePassword").addEventListener("click",()=>{

    if(passwordInput.type==="password"){

        passwordInput.type="text";

        document.getElementById("togglePassword").classList.remove("fa-eye");

        document.getElementById("togglePassword").classList.add("fa-eye-slash");

    }else{

        passwordInput.type="password";

        document.getElementById("togglePassword").classList.remove("fa-eye-slash");

        document.getElementById("togglePassword").classList.add("fa-eye");

    }

});

document.getElementById("toggleConfirmPassword").addEventListener("click",()=>{

    if(confirmPasswordInput.type==="password"){

        confirmPasswordInput.type="text";

        document.getElementById("toggleConfirmPassword").classList.remove("fa-eye");

        document.getElementById("toggleConfirmPassword").classList.add("fa-eye-slash");

    }else{

        confirmPasswordInput.type="password";

        document.getElementById("toggleConfirmPassword").classList.remove("fa-eye-slash");

        document.getElementById("toggleConfirmPassword").classList.add("fa-eye");

    }

});

const form = document.getElementById("registerForm");

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const password = document.getElementById("password").value;

    const confirmPassword = document.getElementById("confirmPassword").value;

    if (password !== confirmPassword) {

        alert("Passwords do not match!");

        return;

    }

    const adminData = {

        username: document.getElementById("username").value,

        email: document.getElementById("email").value,

        password: document.getElementById("password").value

    };

    try {

        const response = await fetch("/api/admin/register", {

            method: "POST",

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify(adminData)

        });

        const result = await response.json();

        if(result.success){

            alert("Registration Successful!");

            window.location.href="admin-login.html";

        }else{

            alert(result.message);

        }

    } catch (error) {

        console.error(error);

    }

});