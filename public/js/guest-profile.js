// Get logged-in guest ID
const guestId = localStorage.getItem("guestId");

// Load Guest Profile
async function loadProfile() {

    try {

        const response = await fetch(`/api/guests/profile/${guestId}`);

        const data = await response.json();

        if (data.success) {

            document.getElementById("name").value = data.guest.name;

            document.getElementById("email").value = data.guest.email;

            document.getElementById("phone").value = data.guest.phone;

            document.getElementById("profileImage").src =
                "/uploads/" + data.guest.profileImage;

        }

    } catch (error) {

        console.log(error);

    }

}

loadProfile();

// Save Profile Changes

document
    .getElementById("saveProfile")
    .addEventListener("click", updateProfile);

async function updateProfile() {

    try {

        const response = await fetch(

            `/api/guests/update-profile/${guestId}`,

            {

                method: "PUT",

                headers: {

                    "Content-Type": "application/json"

                },

                body: JSON.stringify({

                    name: document.getElementById("name").value,

                    phone: document.getElementById("phone").value

                })

            }

        );

        const data = await response.json();

        if (data.success) {

            alert("Profile updated successfully!");

        }

        else {

            alert(data.message);

        }

    }

    catch (error) {

        console.log(error);

        alert("Something went wrong.");

    }

}

// Change Password

document
    .getElementById("changePassword")
    .addEventListener("click", changePassword);

async function changePassword() {

    const currentPassword =
        document.getElementById("currentPassword").value;

    const newPassword =
        document.getElementById("newPassword").value;

    const confirmPassword =
        document.getElementById("confirmPassword").value;

    if (
        currentPassword === "" ||
        newPassword === "" ||
        confirmPassword === ""
    ) {

        alert("Please fill all password fields.");

        return;

    }

    if (newPassword !== confirmPassword) {

        alert("New Password and Confirm Password do not match.");

        return;

    }

    try {

        const response = await fetch(

            `/api/guests/change-password/${guestId}`,

            {

                method: "PUT",

                headers: {

                    "Content-Type": "application/json"

                },

                body: JSON.stringify({

                    currentPassword,

                    newPassword

                })

            }

        );

        const data = await response.json();

        if (data.success) {

            alert("Password changed successfully!");

            document.getElementById("currentPassword").value = "";
            document.getElementById("newPassword").value = "";
            document.getElementById("confirmPassword").value = "";

        }

        else {

            alert(data.message);

        }

    }

    catch (error) {

        console.log(error);

        alert("Something went wrong.");

    }

}