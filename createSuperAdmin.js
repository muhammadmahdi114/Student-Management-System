const axios = require("axios");

async function createSuperAdmin() {
    const name = "AMN-MMC";
    const password = "mmc255";
    const email = "mmc@amn.com";
    const adminRole = "superAdmin";

    try {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            console.log("Please enter a valid email address");
            return;
        }

        const response = await axios.post("http://localhost:8000/register-superAdmin", {
            name,
            email,
            password,
            adminRole
        });

        if (response.data.success) {
            const nameFromResponse = response.data.username;
            const roleFromResponse = response.data.role;
            console.log(`Super Admin created successfully: Name - ${nameFromResponse}, Role - ${roleFromResponse}`);
        } else {
            console.log(response.data.message);
        }
    } catch (error) {
        console.error("Error occurred while creating Super Admin:", error);
    }
}

createSuperAdmin();
