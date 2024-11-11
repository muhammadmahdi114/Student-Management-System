import React, { useState, } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordType, setPasswordType] = useState("password");
    const navigate = useNavigate();

    const handleTogglePass = () => {
        if (passwordType === "password") {
            setPasswordType("text")
        } else {
            setPasswordType("password")
        }
    }

    async function submit(e) {
        e.preventDefault();
        try {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert("Please enter a valid email address");
                return;
            }

            const response = await axios.post("http://localhost:8000/login", {
                email,
                password,
            });

            if (response.data.success) {
                const roleFromResponse = response.data.role;
                console.log(roleFromResponse);
                if(roleFromResponse === "admin-ic"){
                    navigate("/ic-dashboard", { state: { roleFromResponse } });
                }
                else if(roleFromResponse === "admin-pc"){
                    navigate("/pc-dashboard", { state: { roleFromResponse } });
                }
                else if(roleFromResponse === "admin-sc"){
                    navigate("/sc-dashboard", { state: { roleFromResponse } });
                }
                else if(roleFromResponse === "superAdmin"){
                    navigate("/mmc-dashboard", { state: { roleFromResponse } });
                }
            } else {
                alert(response.data.message);
            }
        } catch (error) {
            alert("Error occurred while logging in");
            console.log(error);
        }
    }

    return (
        <div className="h-screen w-screen bg-gradient-to-b from-white to-gray-600 flex flex-col justify-center items-center">
            <img
                src="/logo.png"
                alt="Logo"
                className="h-32 mb-6"
            />
            <div className="m-2 font-bold text-4xl text-gray-800 drop-shadow-lg">LOGIN</div>
            <div className="bg-white mt-5 p-10 rounded-xl shadow-lg w-96 transform transition-all duration-500 hover:scale-105 hover:shadow-2xl">
                <form onSubmit={submit}>
                    <div className="w-80 mt-10">
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="h-12 border-2 border-gray-300 pl-5 w-full rounded-lg bg-gray-100 text-gray-700 placeholder-gray-400 transition-colors duration-300 focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200"
                        />
                    </div>
                    <div className="w-80 mt-8">
                        <input
                            type={passwordType}
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="h-12 border-2 border-gray-300 pl-5 w-full rounded-lg bg-gray-100 text-gray-700 placeholder-gray-400 transition-colors duration-300 focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200"
                        />
                    </div>
                    <div className="mt-8 flex items-center">
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
    )
}