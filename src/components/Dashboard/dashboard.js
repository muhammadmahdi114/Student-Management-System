import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Dashboard() {
    const [students, setStudents] = useState([]);
    const [filteredStudents, setFilteredStudents] = useState([]);
    const [minYearOfBirth, setMinYearOfBirth] = useState("");
    const [maxYearOfBirth, setMaxYearOfBirth] = useState("");
    const [education, setEducation] = useState("");
    const [expertise, setExpertise] = useState("");
    const [category, setCategory] = useState("");
    const [role, setRole] = useState("");
    const navigate = useNavigate();

    useEffect(() => {

        const role = sessionStorage.getItem("role");
        setRole(role);
        if (!role) {
            alert("You must login first.");
            navigate("/");
            return;
        }

        axios.get("http://localhost:8000/students")
            .then(response => {
                setStudents(response.data.data);
                setFilteredStudents(response.data.data);
            })
            .catch(error => {
                console.error("Error fetching students data:", error);
            });
    }, []);

    useEffect(() => {
        const filtered = students.filter(student => {
            const birthYear = student.year_of_birth;

            const isYearInRange =
                (minYearOfBirth === "" || birthYear >= minYearOfBirth) &&
                (maxYearOfBirth === "" || birthYear <= maxYearOfBirth);

            const isEducationMatch = student.education.toLowerCase().includes(education.toLowerCase());
            const isExpertiseMatch = student.expertise.toLowerCase().includes(expertise.toLowerCase());
            const isCategoryMatch = student.category.toLowerCase().includes(category.toLowerCase());

            return isYearInRange && isEducationMatch && isExpertiseMatch && isCategoryMatch;
        });

        setFilteredStudents(filtered);
    }, [minYearOfBirth, maxYearOfBirth, education, expertise, category, students]);

    const handleLogout = () => {
        sessionStorage.clear();
        navigate("/");
    };

    return (
        <div className="h-screen w-screen bg-gray-300 text-black flex flex-col justify-center items-center">
            <img
                src="/logo.png"
                alt="Logo"
                className="absolute top-5 left-5 h-32 mb-6" />
            <div className="absolute top-16 right-5 flex space-x-4">
                {role === "superAdmin" && (
                    <Link to="/registerAdmin" className="bg-white text-black rounded-md p-3 hover:bg-gray-100 transition duration-300 transform hover:scale-105">
                        Register Admin
                    </Link>
                )}
                <Link to="/registerStudent" className="bg-white text-black rounded-md p-3 hover:bg-gray-100 transition duration-300 transform hover:scale-105">
                    Register Students
                </Link>
                <button
                    onClick={handleLogout}
                    className="bg-red-400 text-white rounded-md p-3 hover:bg-red-700 transition duration-300 transform hover:scale-105"
                >
                    Logout
                </button>
            </div>

            <div className="w-full mt-32 bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-bold mb-4">Filters</h2>
                <div className="flex flex-wrap gap-4 mb-6">
                    <div>
                        <label className="block mb-1">Birth Year From:</label>
                        <input
                            type="number"
                            value={minYearOfBirth}
                            onChange={(e) => setMinYearOfBirth(e.target.value)}
                            className="border p-2 rounded"
                        />
                    </div>
                    <div>
                        <label className="block mb-1">Birth Year To:</label>
                        <input
                            type="number"
                            value={maxYearOfBirth}
                            onChange={(e) => setMaxYearOfBirth(e.target.value)}
                            className="border p-2 rounded"
                        />
                    </div>
                    <div>
                        <label className="block mb-1">Education:</label>
                        <input
                            type="text"
                            value={education}
                            onChange={(e) => setEducation(e.target.value)}
                            className="border p-2 rounded"
                        />
                    </div>
                    <div>
                        <label className="block mb-1">Expertise:</label>
                        <input
                            type="text"
                            value={expertise}
                            onChange={(e) => setExpertise(e.target.value)}
                            className="border p-2 rounded"
                        />
                    </div>
                    <div>
                        <label className="block mb-1">Category:</label>
                        <input
                            type="text"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="border p-2 rounded"
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-300">
                        <thead>
                            <tr className="bg-gray-100 border-b">
                                <th className="p-2 border-r">Name</th>
                                <th className="p-2 border-r">Year of Birth</th>
                                <th className="p-2 border-r">Education</th>
                                <th className="p-2 border-r">Contact</th>
                                <th className="p-2 border-r">Job</th>
                                <th className="p-2 border-r">Martial Status</th>
                                <th className="p-2 border-r">Expertise</th>
                                <th className="p-2 border-r">Category</th>
                                <th className="p-2 border-r">Email</th>
                                <th className="p-2 border-r">Address</th>
                                <th className="p-2 border-r">Teaching</th>
                                <th className="p-2">Committee</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredStudents.map(student => (
                                <tr key={student._id} className="border-b">
                                    <td className="p-2 border-r">{student.name}</td>
                                    <td className="p-2 border-r">{student.year_of_birth}</td>
                                    <td className="p-2 border-r">{student.education}</td>
                                    <td className="p-2 border-r">{student.contact}</td>
                                    <td className="p-2 border-r">{student.job}</td>
                                    <td className="p-2 border-r">{student.martial_status}</td>
                                    <td className="p-2 border-r">{student.expertise}</td>
                                    <td className="p-2 border-r">{student.category}</td>
                                    <td className="p-2 border-r">{student.email}</td>
                                    <td className="p-2 border-r">{student.address}</td>
                                    <td className="p-2 border-r">{student.teaching ? "Yes" : "No"}</td>
                                    <td className="p-2">{student.committee}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
