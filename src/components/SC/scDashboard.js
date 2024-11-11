import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

export default function SCDashboard() {
    const [students, setStudents] = useState([]);
    const [filteredStudents, setFilteredStudents] = useState([]);
    const [minYearOfBirth, setMinYearOfBirth] = useState("");
    const [maxYearOfBirth, setMaxYearOfBirth] = useState("");
    const [education, setEducation] = useState("");
    const [currentJob, setCurrentJob] = useState("");
    const [profession, setProfession] = useState("");
    const [role, setRole] = useState("");
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

        axios.get("http://localhost:8000/students")
            .then(response => {
                setStudents(response.data.data);
                setFilteredStudents(response.data.data);
            })
            .catch(error => {
                console.error("Error fetching students data:", error);
            });
    }, [navigate, location.state]);

    useEffect(() => {
        const filtered = students.filter(student => {
            const birthYear = student.year_of_birth;

            const isYearInRange =
                (minYearOfBirth === "" || birthYear >= minYearOfBirth) &&
                (maxYearOfBirth === "" || birthYear <= maxYearOfBirth);

            const isEducationMatch = student.highest_education_level.toLowerCase().includes(education.toLowerCase());
            const isJobRoleMatch = student.current_job_role.toLowerCase().includes(currentJob.toLowerCase());
            const isProfessionMatch = student.profession.toLowerCase().includes(profession.toLowerCase());

            return isYearInRange && isEducationMatch && isJobRoleMatch && isProfessionMatch;
        });

        setFilteredStudents(filtered);
    }, [minYearOfBirth, maxYearOfBirth, education, currentJob, profession, students]);


    const handleLogout = () => {
        sessionStorage.clear();
        navigate("/");
    };

    return (
        <div className="h-screen w-screen bg-gradient-to-b from-white to-gray-500 text-black flex flex-col justify-center items-center">
            <img
                src="/logo.png"
                alt="Logo"
                className="absolute top-5 left-5 h-32 mb-6 transition-transform duration-300 hover:scale-110"
            />
            <h2 className="text-3xl font-bold text-gray-700">Welcome to Secondary Dashboard</h2>

            <div className="absolute top-16 right-5 flex space-x-4">
                <Link to="/registerStudent" state={{ role }} className="bg-white text-gray-800 rounded-md p-3 shadow-md hover:bg-gray-100 transition-transform duration-300 transform hover:scale-105">
                    Register Students
                </Link>
                <button
                    onClick={handleLogout}
                    className="bg-red-500 text-white rounded-md p-3 shadow-md hover:bg-red-600 transition-transform duration-300 transform hover:scale-105"
                >
                    Logout
                </button>
            </div>

            <div className="w-full mt-32 bg-white p-8 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Filters</h2>
                <div className="flex items-center flex-wrap gap-4 mb-6">
                    <div>
                        <label className="block mb-1 text-gray-600">Birth Year From:</label>
                        <input
                            type="number"
                            value={minYearOfBirth}
                            onChange={(e) => setMinYearOfBirth(e.target.value)}
                            className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
                        />
                    </div>
                    <div>
                        <label className="block mb-1 text-gray-600">Birth Year To:</label>
                        <input
                            type="number"
                            value={maxYearOfBirth}
                            onChange={(e) => setMaxYearOfBirth(e.target.value)}
                            className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
                        />
                    </div>
                    <div>
                        <label className="block mb-1 text-gray-600">Education:</label>
                        <input
                            type="text"
                            value={education}
                            onChange={(e) => setEducation(e.target.value)}
                            className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
                        />
                    </div>
                    <div>
                        <label className="block mb-1 text-gray-600">Profession:</label>
                        <input
                            type="text"
                            value={profession}
                            onChange={(e) => setProfession(e.target.value)}
                            className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
                        />
                    </div>
                    <div>
                        <label className="block mb-1 text-gray-600">Current Job:</label>
                        <input
                            type="text"
                            value={currentJob}
                            onChange={(e) => setCurrentJob(e.target.value)}
                            className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-300">
                        <thead>
                            <tr className="bg-gray-100 border-b">
                                <th className="p-2 border-r">Roll No.</th>
                                <th className="p-2 border-r">Name</th>
                                <th className="p-2 border-r">Father's Name</th>
                                <th className="p-2 border-r">Highest Education</th>
                                <th className="p-2 border-r">Contact</th>
                                <th className="p-2 border-r">Current Job</th>
                                <th className="p-2 border-r">Marital Status</th>
                                <th className="p-2 border-r">Profession</th>
                                <th className="p-2 border-r">Email</th>
                                <th className="p-2 border-r">Address</th>
                                <th className="p-2 border-r">Teaching</th>
                                <th className="p-2">Committee</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredStudents.map(student => (
                                <tr key={student._id} className="border-b">
                                    <td className="p-2 border-r">{student.roll_no || "N/A"}</td>
                                    <td className="p-2 border-r">{student.full_name}</td>
                                    <td className="p-2 border-r">{student.father_name}</td>
                                    <td className="p-2 border-r">{student.highest_education_level}</td>
                                    <td className="p-2 border-r">{student.contact_no}</td>
                                    <td className="p-2 border-r">{student.current_job_role || "N/A"}</td>
                                    <td className="p-2 border-r">{student.marital_status || "N/A"}</td>
                                    <td className="p-2 border-r">{student.profession}</td>
                                    <td className="p-2 border-r">{student.email}</td>
                                    <td className="p-2 border-r">{student.resident_address}</td>
                                    <td className="p-2 border-r">{student.teaching ? "Yes" : "No"}</td>
                                    <td className="p-2">{student.committee_member ? "Yes" : "No"}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

    );
}
