import validator from 'validator';
import bcrypt from 'bcrypt';
import { v2 as cloudinary } from 'cloudinary';
import doctorModel from '../models/doctorModel.js';
import jwt from 'jsonwebtoken'
import appointmentModel from './../models/AppointmentModel.js';

// API for adding a doctor
const addDoctor = async (req, res) => {
    try {
        const { name, email, password, speciality, degree, experience, about, fees, address } = req.body;
        const imageFile = req.file;

        // Check for missing fields
        if (!name || !email || !password || !speciality || !degree || !experience || !about || !fees || !address) {
            return res.status(400).json({ success: false, message: "Missing details" });
        }

        // Validate email format
        if (!validator.isEmail(email)) {
            return res.status(400).json({ success: false, message: "Please enter a valid email" });
        }

        // Check for a strong password
        if (password.length < 8) {
            return res.status(400).json({ success: false, message: "Please enter a strong password (minimum 8 characters)" });
        }

        // Hashing the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Upload image to Cloudinary (unchanged)
        const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" });
        const imageUrl = imageUpload.secure_url;

        // Parse address JSON
        let parsedAddress;
        try {
            parsedAddress = JSON.parse(address);
        } catch (parseError) {
            return res.status(400).json({ success: false, message: "Invalid address format" });
        }

        // Create doctor data
        const doctorData = {
            name,
            email,
            password: hashedPassword,
            speciality,
            degree,
            experience,
            about,
            fees,
            address: parsedAddress,
            image: imageUrl,
            date: Date.now(),
        };

        // Save doctor to database
        const newDoctor = new doctorModel(doctorData);
        await newDoctor.save();

        res.status(201).json({ success: true, message: "Doctor added successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server error, please try again later" });
    }
};

const loginAdmin = async (req,res) =>{
    try {
        const {email,password} = req.body;        
        if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
            const token = jwt.sign(email+password, process.env.JWT_SECRET)
            res.status(200).json({ success: true, message: "Login successful", token });

        }else{
            return res.status(400).json({ success: false, message: "Invalid email and password" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server error, please try again later" });
    }
}

// api to get all doctors list for admin panel 
const allDoctors = async(req,res) =>{
    try {
        const doctors = await doctorModel.find({}).select('-password')
        res.status(200).json({ success: true, doctors });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server error, please try again later" });
    }
}

// api to get all appointments
const appointmentsAdmin = async (req,res) =>{
    try {
        const appointments = await appointmentModel.find({})
        res.status(200).json({ success: true, appointments });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server error, please try again later" });
    }
}
export { addDoctor, loginAdmin, allDoctors,appointmentsAdmin};
