import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

export default function RegisterAdmin() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordType, setPasswordType] = useState("password");
    const [adminRole, setAdminRole] = useState("");
    const [role, setRole] = useState("");
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {

        const { role } = location.state || {};
        setRole(role);
        if (role !== "superAdmin") {
            alert("You must be a Super Admin.")
            navigate("/");
            return;
        }
    }, [location.state, navigate]);

    const handleTogglePass = () => {
        setPasswordType(passwordType === "password" ? "text" : "password");
    };

    async function submit(e) {
        e.preventDefault();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert("Please enter a valid email address");
            return;
        }

        const payload = { name, email, password, adminRole };

        try {
            const response = await axios.post("http://localhost:8000/register-admin", payload, {
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (response.data.success) {
                navigate("/mmc-dashboard");
            } else {
                alert(response.data.message);
            }
        } catch (error) {
            alert("Error occurred while signing up");
            console.log(error);
        }
    }
    console.log(adminRole);

    return (
        <div className="h-screen w-screen bg-gradient-to-b from-white to-gray-600 flex flex-col justify-center items-center">
            <img
                src="/arrow.png"
                alt="Back"
                className="h-10 absolute top-5 left-5 mb-6 transition-transform duration-300 hover:scale-110"
                onClick={() => { navigate("/dashboard", { state: { role } }) }}
            />
            <img
                src="/logo.png"
                alt="Logo"
                className="h-32 mb-6 transition-transform duration-300 hover:scale-110"
            />
            <div className="m-2 font-bold text-4xl text-gray-800 drop-shadow-lg">REGISTER ADMIN</div>
            <div className="bg-white mt-5 p-10 rounded-xl shadow-lg w-96 transform transition-all duration-500 hover:scale-105 hover:shadow-2xl">
                <form onSubmit={submit}>
                    <div className="w-80 mt-10">
                        <input
                            type="text"
                            placeholder="Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="h-12 border-2 border-gray-300 pl-5 w-full rounded-lg bg-gray-100 text-gray-700 placeholder-gray-400 transition-colors duration-300 focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200"
                        />
                    </div>
                    <div className="w-80 mt-4">
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="h-12 border-2 border-gray-300 pl-5 w-full rounded-lg bg-gray-100 text-gray-700 placeholder-gray-400 transition-colors duration-300 focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200"
                        />
                    </div>
                    <div className="w-80 mt-4">
                        <select
                            value={adminRole}
                            onChange={(e) => setAdminRole(e.target.value)}
                            className="h-12 border-2 border-gray-300 pl-5 w-full rounded-lg bg-gray-100 text-gray-700 transition-colors duration-300 focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200"
                        >
                            <option value="" disabled>Select Committee</option>
                            <option value="admin-ic">IC Committee</option>
                            <option value="admin-pc">PC Committee</option>
                            <option value="admin-sc">SC Committee</option>
                        </select>
                    </div>
                    <div className="w-80 mt-4">
                        <input
                            type={passwordType}
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="h-12 border-2 border-gray-300 pl-5 w-full rounded-lg bg-gray-100 text-gray-700 placeholder-gray-400 transition-colors duration-300 focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200"
                        />
                    </div>
                    <div className="mt-4 flex items-center">
                        <input
                            type="checkbox"
                            onChange={handleTogglePass}
                            className="transform transition-all duration-300 checked:scale-110"
                        />
                        <label className="ml-2 text-gray-800 mb-1">Show Password</label>
                    </div>
                    <div className="w-80 mt-10">
                        <button
                            type="submit"
                            className="p-3 rounded-xl text-center bg-blue-500 text-white h-12 w-full hover:bg-blue-600 hover:shadow-lg transition-transform transform hover:-translate-y-1 hover:scale-105 duration-300 focus:outline-none focus:shadow-outline"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>

    );
}
