const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');

const StudentSchema = require("./src/models/student")
const AdminSchema = require("./src/models/admin")

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb+srv://mahdimuhammad116:amn255@student-management-syst.au7mt.mongodb.net/Students-Data")
    .then(() => {
        console.log("mongodb connected");
    })
    .catch((error) => {
        console.error('Connection error:', error);
    });

app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    if (!password) {
        return res.status(400).json({ success: false, message: "Password is required" });
    }

    try {
        const user = await AdminSchema.findOne({ email });

        if (user && await bcrypt.compare(password, user.password)) {
            return res.status(200).json({
                success: true,
                username: user.name,
                role: user.role
            });
        } else {
            return res.status(401).json({ success: false, message: "Invalid email or password" });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});

app.post("/register-superAdmin", async (req, res) => {
    const { name, email, password } = req.body;
    const role = 'superAdmin';

    try {
        const check = await AdminSchema.findOne({ email: email });

        if (check) {
            return res.status(409).json({ success: false, message: "User already exists" });
        } else {
            const EncPassword = await bcrypt.hash(password, 10);
            const user = await AdminSchema.create({
                name,
                email,
                password: EncPassword,
                role,
            });
            return res.status(201).json({ success: true, user });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});

app.post("/register-admin", async (req, res) => {
    const { name, email, password } = req.body;
    const role = 'admin';

    try {
        const check = await AdminSchema.findOne({ email });

        if (check) {
            return res.status(409).json({ success: false, message: "User already exists" });
        } else {
            const EncPassword = await bcrypt.hash(password, 10);
            const user = await AdminSchema.create({
                name,
                email,
                password: EncPassword,
                role,
            });
            return res.status(201).json({ success: true, user });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});

app.post("/register-student", async (req, res) => {
    const { name, year_of_birth, education, contact, job, martial_status, expertise, category, email, address, teaching, khidmat, committee } = req.body;

    try {
        const existingStudent = await StudentSchema.findOne({ email });

        if (existingStudent) {
            return res.status(409).json({ success: false, message: "Student already exists" });
        } else {
            const student = await StudentSchema.create({
                name,
                year_of_birth,
                education,
                contact,
                job,
                martial_status,
                expertise,
                category,
                email,
                address,
                teaching,
                khidmat,
                committee
            });
            return res.status(201).json({ success: true, student });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});

app.get("/students", async (req, res) => {
    try {
        const students = await StudentSchema.find({});

        res.status(200).json({
            success: true,
            data: students
        });
    } catch (error) {
        console.error('Error fetching student data:', error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
});

app.listen(8000, () => {
    console.log("Server is running on port 8000");
});
