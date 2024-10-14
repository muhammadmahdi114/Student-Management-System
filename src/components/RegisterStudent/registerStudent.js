import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

export default function RegisterStudent() {
    const [role, setRole] = useState("");
    // Personal Information
    const [name, setName] = useState("");
    const [rollNo, setRollNo] = useState("");
    const [fatherName, setFatherName] = useState("");
    const [fatherProfession, setFatherProfession] = useState("");
    const [fatherContact, setFatherContact] = useState("");
    const [yearOfBirth, setYearOfBirth] = useState("");
    const [martialStatus, setMartialStatus] = useState("");
    const [bloodGroup, setBloodGroup] = useState("");
    const [hometown, setHometown] = useState("");
    const [languages, setLanguages] = useState("");
    const [relativeInfo, setRelativeInfo] = useState({ name: "", relationship: "", class: "" });

    // Education Information
    const [highestEducation, setHighestEducation] = useState("");
    const [educationInstitute, setEducationInstitute] = useState("");
    const [className, setClassName] = useState("");
    const [teacherName, setTeacherName] = useState("");
    const [joiningDateClass, setJoiningDateClass] = useState("");
    const [joiningDateAssociation, setJoiningDateAssociation] = useState("");

    // Contact Information
    const [contact, setContact] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [country, setCountry] = useState("");

    // Professional Details
    const [profession, setProfession] = useState("");
    const [currentJobRole, setCurrentJobRole] = useState("");
    const [officeName, setOfficeName] = useState("");
    const [officeAddress, setOfficeAddress] = useState("");

    // Association Information
    const [isTeacher, setIsTeacher] = useState(false);
    const [isCommitteeMember, setIsCommitteeMember] = useState(false);
    const [committeeName, setCommitteeName] = useState("");
    const [joiningDateCommittee, setJoiningDateCommittee] = useState("");

    // Referral Information
    const [referredBy, setReferredBy] = useState({ name: "", contact: "", email: "" });

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const { role } = location.state || {};
        setRole(role);
        if (!role) {
            alert("You must login first.");
            navigate("/");
            return;
        }
    }, [location.state, navigate]);

    async function submit(e) {
        e.preventDefault();

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert("Please enter a valid email address");
            return;
        }

        try {
            const response = await axios.post("http://localhost:8000/register-student", {
                full_name: name,
                roll_no: rollNo,
                father_name: fatherName,
                father_profession: fatherProfession,
                father_contact: fatherContact,
                year_of_birth: yearOfBirth,
                marital_status: martialStatus,
                blood_group: bloodGroup,
                hometown,
                languages: languages,
                blood_relative_in_classes: relativeInfo,
                highest_education_level: highestEducation,
                highest_education_institute: educationInstitute,
                class_name: className,
                teacher_name: teacherName,
                date_of_joining_current_class: joiningDateClass,
                date_of_joining_association: joiningDateAssociation,
                contact_no: contact,
                email,
                resident_address: address,
                city,
                country,
                profession,
                current_job_role: currentJobRole,
                office_name: officeName,
                office_address: officeAddress,
                committee_member: isCommitteeMember,
                committee_name: committeeName,
                date_of_joining_committee: joiningDateCommittee,
                referred_by: referredBy
            });

            if (response.data.success) {
                alert("Student registered successfully");
                navigate("/dashboard", { state: { role } });
            } else {
                alert(response.data.message);
            }
        } catch (error) {
            alert("Error occurred while registering student");
            console.error(error);
        }
    }

    return (
        <div className="h-full w-full bg-gradient-to-b from-white to-gray-500 flex flex-col justify-center items-center">
            <div className="flex lg:flex-row flex-col justify-center items-center gap-x-10 my-5">
            <img
                    src="/arrow.png"
                    alt="Back"
                    className="h-10 absolute top-5 left-5 mb-6 transition-transform duration-300 hover:scale-110"
                    onClick={()=> {navigate("/dashboard" , {state: {role}}) }}
                />
                <img
                    src="/logo.png"
                    alt="Logo"
                    className="h-32 mb-6 transition-transform duration-300 hover:scale-110"
                />
                <h1 className="text-3xl font-bold">Register Students</h1>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md w-full mx-20 px-10">
                <form onSubmit={submit}>
                    <div className="flex lg:flex-row flex-col lg:justify-between justify-center">
                        <div className="lg:w-1/2 w-full mb-4">
                            <h2 className="text-2xl font-bold">Personal Information</h2>
                            <div className="w-80 mt-5">
                                <input
                                    type="text"
                                    placeholder="Full Name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="h-12 border-2 border-gray-300 pl-5 w-full rounded-lg shadow-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-400 transition duration-300 ease-in-out hover:shadow-md text-gray-700 placeholder-gray-400"
                                />
                            </div>
                            <div className="w-80 mt-1">
                                <input
                                    type="number"
                                    placeholder="Roll Number"
                                    value={rollNo}
                                    onChange={(e) => setRollNo(e.target.value)}
                                    className="h-12 border-2 border-gray-300 px-5 w-full rounded-lg shadow-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-400 transition duration-300 ease-in-out hover:shadow-md text-gray-700 placeholder-gray-400"
                                />
                            </div>
                            <div className="w-80 mt-1">
                                <input
                                    type="text"
                                    placeholder="Father Name"
                                    value={fatherName}
                                    onChange={(e) => setFatherName(e.target.value)}
                                    className="h-12 border-2 border-gray-300 pl-5 w-full rounded-lg shadow-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-400 transition duration-300 ease-in-out hover:shadow-md text-gray-700 placeholder-gray-400"
                                />
                            </div>
                            <div className="w-80 mt-1">
                                <input
                                    type="number"
                                    placeholder="Father Contact"
                                    value={fatherContact}
                                    onChange={(e) => setFatherContact(e.target.value)}
                                    className="h-12 border-2 border-gray-300 px-5 w-full rounded-lg shadow-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-400 transition duration-300 ease-in-out hover:shadow-md text-gray-700 placeholder-gray-400"
                                />
                            </div>
                            <div className="w-80 mt-1">
                                <input
                                    type="text"
                                    placeholder="Father Profession"
                                    value={fatherProfession}
                                    onChange={(e) => setFatherProfession(e.target.value)}
                                    className="h-12 border-2 border-gray-300 pl-5 w-full rounded-lg shadow-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-400 transition duration-300 ease-in-out hover:shadow-md text-gray-700 placeholder-gray-400"
                                />
                            </div>
                            <div className="w-80 mt-1">
                                <label className="text-gray-700 font-medium">Year of Birth</label>
                                <input
                                    type="date"
                                    value={yearOfBirth}
                                    onChange={(e) => setYearOfBirth(e.target.value)}
                                    className="h-12 border-2 border-gray-300 px-5 w-full rounded-lg shadow-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-400 transition duration-300 ease-in-out hover:shadow-md text-gray-700 placeholder-gray-400"
                                />
                            </div>
                            <div className="w-80 mt-1">
                                <input
                                    type="boolean"
                                    placeholder="Martial Status"
                                    value={martialStatus}
                                    onChange={(e) => setMartialStatus(e.target.value)}
                                    className="h-12 border-2 border-gray-300 pl-5 w-full rounded-lg shadow-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-400 transition duration-300 ease-in-out hover:shadow-md text-gray-700 placeholder-gray-400"
                                />
                            </div>
                            <div className="w-80 mt-1">
                                <input
                                    type="text"
                                    placeholder="Blood Group"
                                    value={bloodGroup}
                                    onChange={(e) => setBloodGroup(e.target.value)}
                                    className="h-12 border-2 border-gray-300 pl-5 w-full rounded-lg shadow-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-400 transition duration-300 ease-in-out hover:shadow-md text-gray-700 placeholder-gray-400"
                                />
                            </div>
                            <div className="w-80 mt-1">
                                <input
                                    type="text"
                                    placeholder="Home Town"
                                    value={hometown}
                                    onChange={(e) => setHometown(e.target.value)}
                                    className="h-12 border-2 border-gray-300 pl-5 w-full rounded-lg shadow-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-400 transition duration-300 ease-in-out hover:shadow-md text-gray-700 placeholder-gray-400"
                                />
                            </div>
                            <div className="w-80 mt-1">
                                <input
                                    type="text"
                                    placeholder="Languages (comma separated)"
                                    value={languages}
                                    onChange={(e) => setLanguages(e.target.value.split(",").map(lang => lang.trim()))}
                                    className="h-12 border-2 border-gray-300 pl-5 w-full rounded-lg shadow-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-400 transition duration-300 ease-in-out hover:shadow-md text-gray-700 placeholder-gray-400"
                                />
                            </div>
                            <h2 className="text-lg font-bold mt-3">Blood Relatives in Classes</h2>
                            <div className="w-80 mt-1">
                                <input
                                    type="text"
                                    placeholder="Name of Relative"
                                    value={relativeInfo.name}
                                    onChange={(e) => setRelativeInfo({ ...relativeInfo, name: e.target.value })}
                                    className="h-12 border-2 border-gray-300 pl-5 w-full rounded-lg shadow-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-400 transition duration-300 ease-in-out hover:shadow-md text-gray-700 placeholder-gray-400"
                                />
                            </div>
                            <div className="w-80 mt-1">
                                <input
                                    type="text"
                                    placeholder="Relationship with them"
                                    value={relativeInfo.relationship}
                                    onChange={(e) => setRelativeInfo({ ...relativeInfo, relationship: e.target.value })}
                                    className="h-12 border-2 border-gray-300 pl-5 w-full rounded-lg shadow-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-400 transition duration-300 ease-in-out hover:shadow-md text-gray-700 placeholder-gray-400"
                                />
                            </div>
                            <div className="w-80 mt-1">
                                <input
                                    type="text"
                                    placeholder="Class of Relative"
                                    value={relativeInfo.class}
                                    onChange={(e) => setRelativeInfo({ ...relativeInfo, class: e.target.value })}
                                    className="h-12 border-2 border-gray-300 pl-5 w-full rounded-lg shadow-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-400 transition duration-300 ease-in-out hover:shadow-md text-gray-700 placeholder-gray-400"
                                />
                            </div>
                        </div>
                        <div className="lg:w-1/2 w-full mb-4">
                            <h2 className="text-2xl font-bold">Educational Information</h2>
                            <div className="w-80 mt-5">
                                <input
                                    type="text"
                                    placeholder="Highest Education"
                                    value={highestEducation}
                                    onChange={(e) => setHighestEducation(e.target.value)}
                                    className="h-12 border-2 border-gray-300 pl-5 w-full rounded-lg shadow-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-400 transition duration-300 ease-in-out hover:shadow-md text-gray-700 placeholder-gray-400"
                                />
                            </div>
                            <div className="w-80 mt-1">
                                <input
                                    type="text"
                                    placeholder="Educational Institute"
                                    value={educationInstitute}
                                    onChange={(e) => setEducationInstitute(e.target.value)}
                                    className="h-12 border-2 border-gray-300 pl-5 w-full rounded-lg shadow-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-400 transition duration-300 ease-in-out hover:shadow-md text-gray-700 placeholder-gray-400"
                                />
                            </div>
                            <h2 className="text-2xl font-bold mt-3">AMN Class</h2>
                            <div className="w-80 mt-1">
                                <input
                                    type="text"
                                    placeholder="Class Name"
                                    value={className}
                                    onChange={(e) => setClassName(e.target.value)}
                                    className="h-12 border-2 border-gray-300 pl-5 w-full rounded-lg shadow-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-400 transition duration-300 ease-in-out hover:shadow-md text-gray-700 placeholder-gray-400"
                                />
                            </div>
                            <div className="w-80 mt-1">
                                <input
                                    type="text"
                                    placeholder="Teacher Name"
                                    value={teacherName}
                                    onChange={(e) => setTeacherName(e.target.value)}
                                    className="h-12 border-2 border-gray-300 pl-5 w-full rounded-lg shadow-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-400 transition duration-300 ease-in-out hover:shadow-md text-gray-700 placeholder-gray-400"
                                />
                            </div>
                            <div className="w-80 mt-1">
                                <label className="text-gray-700 font-medium">Class Joining Date</label>

                                <input
                                    type="date"
                                    value={joiningDateClass}
                                    onChange={(e) => setJoiningDateClass(e.target.value)}
                                    className="h-12 border-2 border-gray-300 px-5 w-full rounded-lg shadow-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-400 transition duration-300 ease-in-out hover:shadow-md text-gray-700 placeholder-gray-400"
                                />
                            </div>
                            <div className="w-80 mt-1">
                                <label className="text-gray-700 font-medium">AMN Joining Date</label>
                                <input
                                    type="date"
                                    value={joiningDateAssociation}
                                    onChange={(e) => setJoiningDateAssociation(e.target.value)}
                                    className="h-12 border-2 border-gray-300 px-5 w-full rounded-lg shadow-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-400 transition duration-300 ease-in-out hover:shadow-md text-gray-700 placeholder-gray-400"
                                />
                            </div>
                            <h2 className="text-2xl font-bold mt-3">Contact Information</h2>
                            <div className="w-80 mt-1">
                                <input
                                    type="number"
                                    placeholder="Contact Number"
                                    value={contact}
                                    onChange={(e) => setContact(e.target.value)}
                                    className="h-12 border-2 border-gray-300 px-5 w-full rounded-lg shadow-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-400 transition duration-300 ease-in-out hover:shadow-md text-gray-700 placeholder-gray-400"
                                />
                            </div>
                            <div className="w-80 mt-1">
                                <input
                                    type="text"
                                    placeholder="Email Address"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="h-12 border-2 border-gray-300 pl-5 w-full rounded-lg shadow-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-400 transition duration-300 ease-in-out hover:shadow-md text-gray-700 placeholder-gray-400"
                                />
                            </div>
                            <div className="w-80 mt-1">
                                <input
                                    type="text"
                                    placeholder="Address (Sector/Mohalla)"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    className="h-12 border-2 border-gray-300 pl-5 w-full rounded-lg shadow-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-400 transition duration-300 ease-in-out hover:shadow-md text-gray-700 placeholder-gray-400"
                                />
                            </div>
                            <div className="w-80 mt-1">
                                <input
                                    type="text"
                                    placeholder="City"
                                    value={city}
                                    onChange={(e) => setCity(e.target.value)}
                                    className="h-12 border-2 border-gray-300 pl-5 w-full rounded-lg shadow-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-400 transition duration-300 ease-in-out hover:shadow-md text-gray-700 placeholder-gray-400"
                                />
                            </div>
                            <div className="w-80 mt-1">
                                <input
                                    type="text"
                                    placeholder="Country"
                                    value={country}
                                    onChange={(e) => setCountry(e.target.value)}
                                    className="h-12 border-2 border-gray-300 pl-5 w-full rounded-lg shadow-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-400 transition duration-300 ease-in-out hover:shadow-md text-gray-700 placeholder-gray-400"
                                />
                            </div>
                        </div>
                        <div className="lg:w-1/2 w-full mb-4">
                            <h2 className="text-2xl font-bold">Professional Details</h2>
                            <div className="w-80 mt-5">
                                <input
                                    type="text"
                                    placeholder="Profession"
                                    value={profession}
                                    onChange={(e) => setProfession(e.target.value)}
                                    className="h-12 border-2 border-gray-300 pl-5 w-full rounded-lg shadow-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-400 transition duration-300 ease-in-out hover:shadow-md text-gray-700 placeholder-gray-400"
                                />
                            </div>
                            <div className="w-80 mt-1">
                                <input
                                    type="text"
                                    placeholder="Current Job"
                                    value={currentJobRole}
                                    onChange={(e) => setCurrentJobRole(e.target.value)}
                                    className="h-12 border-2 border-gray-300 pl-5 w-full rounded-lg shadow-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-400 transition duration-300 ease-in-out hover:shadow-md text-gray-700 placeholder-gray-400"
                                />
                            </div>
                            <div className="w-80 mt-1">
                                <input
                                    type="text"
                                    placeholder="Office Name"
                                    value={officeName}
                                    onChange={(e) => setOfficeName(e.target.value)}
                                    className="h-12 border-2 border-gray-300 pl-5 w-full rounded-lg shadow-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-400 transition duration-300 ease-in-out hover:shadow-md text-gray-700 placeholder-gray-400"
                                />
                            </div>
                            <div className="w-80 mt-1">
                                <input
                                    type="text"
                                    placeholder="Office Address"
                                    value={officeAddress}
                                    onChange={(e) => setOfficeAddress(e.target.value)}
                                    className="h-12 border-2 border-gray-300 pl-5 w-full rounded-lg shadow-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-400 transition duration-300 ease-in-out hover:shadow-md text-gray-700 placeholder-gray-400"
                                />
                            </div>
                            <h2 className="text-2xl font-bold mt-3">AMN Information</h2>
                            <div className="flex items-center space-x-3 mt-1">
                                <input
                                    type="checkbox"
                                    checked={isTeacher}
                                    onChange={(e) => setIsTeacher(e.target.checked)}
                                    className="h-5 w-5 border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300 ease-in-out"
                                />
                                <label className="text-gray-700 font-medium">Are you a Teacher?</label>
                            </div>
                            <div className="flex items-center space-x-3 my-1">
                                <input
                                    type="checkbox"
                                    checked={isCommitteeMember}
                                    onChange={(e) => setIsCommitteeMember(e.target.checked)}
                                    className="h-5 w-5 border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300 ease-in-out"
                                />
                                <label className="text-gray-700 font-medium">Are you a Committee Member?</label>
                            </div>
                            <div className="w-80 my-1">
                                <input
                                    type="text"
                                    placeholder="Committee Name"
                                    value={committeeName}
                                    onChange={(e) => setCommitteeName(e.target.value)}
                                    className="h-12 border-2 border-gray-300 pl-5 w-full rounded-lg shadow-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-400 transition duration-300 ease-in-out hover:shadow-md text-gray-700 placeholder-gray-400"
                                />
                            </div>
                            <div className="w-80 mt-1">
                                <label className="text-gray-700 font-medium">Committee Joining Date</label>
                                <input
                                    type="date"
                                    value={joiningDateCommittee}
                                    onChange={(e) => setJoiningDateCommittee(e.target.value)}
                                    className="h-12 border-2 border-gray-300 px-5 w-full rounded-lg shadow-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-400 transition duration-300 ease-in-out hover:shadow-md text-gray-700 placeholder-gray-400"
                                />
                            </div>
                            <h2 className="text-2xl font-bold mt-3">Referral Information</h2>
                            <div className="w-80 mt-1">
                                <input
                                    type="text"
                                    placeholder="Name of Reference"
                                    value={referredBy.name}
                                    onChange={(e) => setReferredBy({ ...referredBy, name: e.target.value })}
                                    className="h-12 border-2 border-gray-300 px-5 w-full rounded-lg shadow-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-400 transition duration-300 ease-in-out hover:shadow-md text-gray-700 placeholder-gray-400"
                                />
                            </div>
                            <div className="w-80 mt-1">
                                <input
                                    type="text"
                                    placeholder="Email of Reference"
                                    value={referredBy.email}
                                    onChange={(e) => setReferredBy({ ...referredBy, email: e.target.value })}
                                    className="h-12 border-2 border-gray-300 px-5 w-full rounded-lg shadow-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-400 transition duration-300 ease-in-out hover:shadow-md text-gray-700 placeholder-gray-400"
                                />
                            </div>
                            <div className="w-80 mt-1">
                                <input
                                    type="text"
                                    placeholder="Contact of Reference"
                                    value={referredBy.contact}
                                    onChange={(e) => setReferredBy({ ...referredBy, contact: e.target.value })}
                                    className="h-12 border-2 border-gray-300 px-5 w-full rounded-lg shadow-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-400 transition duration-300 ease-in-out hover:shadow-md text-gray-700 placeholder-gray-400"
                                />
                            </div>

                            <div className="w-80 mt-1">
                                <button
                                    type="submit"
                                    className="p-2 rounded text-center border-white mt-4 bg-blue-500 text-white h-12 w-full hover:bg-blue-700 hover:shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1 focus:outline-none focus:shadow-outline"
                                >
                                    Submit
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div >
        </div >
    );
}
