import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import MMCCommittee from "./mmcCommittee";
import MMCStudent from "./mmcStudents";

export default function MMCDashboard() {
    const [role, setRole] = useState("");
    const [isStudentActive, setIsStudentActive] = useState(true);
    const [isCommitteeActive, setIsCommitteeActive] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const { roleFromResponse } = location.state || {};
        setRole(roleFromResponse);
        if (!roleFromResponse) {
            const { role } = location.state || {};
            setRole(role);
            if (!role) {
                alert("You must login first.");
                navigate("/");
                return;
            }
        }
    }, [navigate, location.state]);

    const handleLogout = () => {
        sessionStorage.clear();
        navigate("/");
    };

    return (
        <>
            <div className="flex">
                <div className="fixed top-0 left-0 h-screen w-52 bg-white text-black py-6 flex flex-col justify-between">
                    <div className="px-6">
                        <div className="w-full flex justify-center">
                            <img
                                src="/logo.png"
                                alt="Logo"
                                className="h-24 mb-6 transition-transform duration-300 hover:scale-110"
                            />
                        </div>
                        <div className="space-y-2 text-start">
                            <h2 className="text-xl font-semibold mb-5">MMC Dashboard</h2>

                            <button onClick={() => { setIsStudentActive(true); setIsCommitteeActive(false) }} className={`${isStudentActive ? 'text-secondary underline font-bold' : 'hover:text-primary'} transition-colors duration-300`}>
                                Students' Database
                            </button >
                            <button onClick={() => { setIsCommitteeActive(true); setIsStudentActive(false) }} className={`${isCommitteeActive ? 'text-secondary underline font-bold' : 'hover:text-primary'} transition-colors duration-300`}>
                                Committee Members
                            </button>
                        </div>
                    </div>

                    <div className="w-full flex items-center space-x-2 px-2">
                        <Link to="/registerAdmin" state={{ role }} className="bg-gray-200 text-gray-800 rounded-md p-3 shadow-md hover:bg-gray-100 transition-transform duration-300 transform hover:scale-105">
                            Register Admin
                        </Link>
                        <button
                            onClick={handleLogout}
                            className="bg-red-500 flex text-[#374151] rounded-md p-3 shadow-md hover:bg-red-600 transition-transform duration-300 transform hover:scale-105"
                        >
                            <img src="/logout.png" alt="" className="h-6" />
                        </button>
                    </div>
                </div>
            </div>
            <div className="h-screen w-screen ml-52 bg-gradient-to-b from-white to-gray-500 text-black flex flex-col justify-center items-center">

                <div className="absolute top-16 right-5 flex space-x-4">
                    <Link to="/registerStudent" state={{ role }} className="bg-white text-gray-800 rounded-md p-3 shadow-md hover:bg-gray-100 transition-transform duration-300 transform hover:scale-105">
                        Register Students
                    </Link>

                </div>
                {isStudentActive && (
                    <MMCStudent />
                )}
                {isCommitteeActive && (
                    <MMCCommittee />
                )}

            </div>
        </>
    );
}
