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
                const nameFromResponse = response.data.username;
                const roleFromResponse = response.data.role;
                sessionStorage.setItem("name", nameFromResponse);
                sessionStorage.setItem("role", roleFromResponse);
                navigate("/dashboard");
            } else {
                alert(response.data.message);
            }
        } catch (error) {
            alert("Error occurred while logging in");
            console.log(error);
        }
    }

    return (
        <div className="h-screen w-screen bg-gray-300 flex flex-col justify-center items-center">
            <img
                src="/logo.png"
                alt="Logo" 
                className="h-32 mb-10"/>
            <div className="bg-white p-8 rounded-lg shadow-md w-96">
                <form onSubmit={submit}>
                    <div className="w-80 mt-10">
                        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="h-8 border-b-2 border-gray-200 pl-5 w-full" />
                    </div>
                    <div className="w-80 mt-10">
                        <input type={passwordType} placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="h-8 border-b-2 border-gray-200 pl-5 w-full" />
                    </div>
                    <div className="mt-10">
                        <input type="checkbox" onChange={handleTogglePass} />
                        <label className="ml-2">Show password</label>
                    </div>
                    <div className="w-80 mt-10">
                        <button
                            type="submit"
                            className="p-2 rounded text-center border-white mt-4 bg-blue-500 text-white h-12 w-full hover:bg-blue-700 hover:shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1 focus:outline-none focus:shadow-outline"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}