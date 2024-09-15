import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function RegisterStudent() {
    const [name, setName] = useState("");
    const [yearOfBirth, setYearOfBirth] = useState("");
    const [education, setEducation] = useState("");
    const [contact, setContact] = useState("");
    const [job, setJob] = useState("");
    const [martialStatus, setMartialStatus] = useState("");
    const [expertise, setExpertise] = useState("");
    const [category, setCategory] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [teaching, setTeaching] = useState("");
    const [khidmat, setKhidmat] = useState("");
    const [committee, setCommittee] = useState("");
    const navigate = useNavigate();

    async function submit(e) {
        e.preventDefault();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert("Please enter a valid email address");
            return;
        }

        try {
            const response = await axios.post("http://localhost:8000/register-student", {
                name,
                year_of_birth: yearOfBirth,
                education,
                contact,
                job,
                martial_status: martialStatus,
                expertise,
                category,
                email,
                address,
                teaching,
                khidmat,
                committee
            });

            if (response.data.success) {
                alert("Student registered successfully");
                navigate("/dashboard");
            } else {
                alert(response.data.message);
            }
        } catch (error) {
            alert("Error occurred while registering student");
            console.error(error);
        }
    }

    return (
        <div className="h-full w-screen bg-gray-300 flex flex-col justify-center items-center">
            <div className="bg-white p-8 rounded-lg shadow-md w-96">
                <form onSubmit={submit}>
                    <div className="w-80 mt-10">
                        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} className="h-8 border-b-2 border-gray-200 pl-5 w-full" />
                    </div>
                    <div className="w-80 mt-10">
                        <input type="number" placeholder="Year Of Birth" value={yearOfBirth} onChange={(e) => setYearOfBirth(e.target.value)} className="h-8 border-b-2 border-gray-200 pl-5 w-full" />
                    </div>
                    <div className="w-80 mt-10">
                        <input type="text" placeholder="Education" value={education} onChange={(e) => setEducation(e.target.value)} className="h-8 border-b-2 border-gray-200 pl-5 w-full" />
                    </div>
                    <div className="w-80 mt-10">
                        <input type="number" placeholder="Contact" value={contact} onChange={(e) => setContact(e.target.value)} className="h-8 border-b-2 border-gray-200 pl-5 w-full" />
                    </div>
                    <div className="w-80 mt-10">
                        <input type="text" placeholder="Job" value={job} onChange={(e) => setJob(e.target.value)} className="h-8 border-b-2 border-gray-200 pl-5 w-full" />
                    </div>
                    <div className="w-80 mt-10">
                        <input type="text" placeholder="Martial Status" value={martialStatus} onChange={(e) => setMartialStatus(e.target.value)} className="h-8 border-b-2 border-gray-200 pl-5 w-full" />
                    </div>
                    <div className="w-80 mt-10">
                        <input type="text" placeholder="Expertise" value={expertise} onChange={(e) => setExpertise(e.target.value)} className="h-8 border-b-2 border-gray-200 pl-5 w-full" />
                    </div>
                    <div className="w-80 mt-10">
                        <input type="text" placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)} className="h-8 border-b-2 border-gray-200 pl-5 w-full" />
                    </div>
                    <div className="w-80 mt-10">
                        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="h-8 border-b-2 border-gray-200 pl-5 w-full" />
                    </div>
                    <div className="w-80 mt-10">
                        <input type="text" placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} className="h-8 border-b-2 border-gray-200 pl-5 w-full" />
                    </div>
                    <div className="w-80 mt-10">
                        <input type="text" placeholder="Teaching" value={teaching} onChange={(e) => setTeaching(e.target.value)} className="h-8 border-b-2 border-gray-200 pl-5 w-full" />
                    </div>
                    <div className="w-80 mt-10">
                        <input type="text" placeholder="Khidmat" value={khidmat} onChange={(e) => setKhidmat(e.target.value)} className="h-8 border-b-2 border-gray-200 pl-5 w-full" />
                    </div>
                    <div className="w-80 mt-10">
                        <input type="text" placeholder="Committee" value={committee} onChange={(e) => setCommittee(e.target.value)} className="h-8 border-b-2 border-gray-200 pl-5 w-full" />
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
