const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    const loginData = {

        username: document.getElementById("username").value,

        password: document.getElementById("password").value

    };

    try {

        const response = await fetch("/api/admin/login", {

            method: "POST",

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify(loginData)

        });

        const result = await response.json();

        if (result.success) {

            localStorage.setItem("adminLoggedIn", "true");
            localStorage.setItem("adminUsername", result.admin.username);
            localStorage.setItem("admin", JSON.stringify(result.admin));

            window.location.href = "admin-dashboard.html";
        }else{

            alert(result.message);

        }

    } catch (error) {

        console.error(error);

        alert("Server Error");

    }

});