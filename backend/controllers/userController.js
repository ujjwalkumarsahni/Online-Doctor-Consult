import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {v2 as cloudinary} from 'cloudinary'
import { userModel } from "../models/userModel.js";
import doctorModel from './../models/doctorModel.js';
import appointmentModel from "../models/AppointmentModel.js";

// API to register user
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if all details are provided
    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: "Missing Details" });
    }

    // Validate email format
    if (!validator.isEmail(email)) {
      return res.status(400).json({ success: false, message: "Enter a valid email" });
    }

    // Validate password length (at least 8 characters)
    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 8 characters long",
      });
    }

    // Check if email is already registered
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email is already registered. Please login.",
      });
    }

    // Hashing the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const userData = {
      name,
      email,
      password: hashedPassword,
    };

    // Create user and save in database
    const newUser = new userModel(userData);
    const user = await newUser.save();

    // Generate token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      token,
    });

  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// api for login the user
const loginUser = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Validate email and password
      if (!email || !password) {
        return res.status(400).json({
          success: false,
          message: "Please provide both email and password",
        });
      }
  
      // Find user by email (case-insensitive)
      const user = await userModel.findOne({ email });
  
      if (!user) {
        return res.status(401).json({
          success: false,
          message: "User does not exist",
        });
      }
  
      // Compare passwords
      const isMatch = await bcrypt.compare(password, user.password);
  
      if (isMatch) {
        // Generate JWT token with expiration
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  
        return res.status(200).json({
          success: true,
          token,
          message: "Login successful",
        });
      } else {
        return res.status(401).json({
          success: false,
          message: "Invalid email or password",
        });
      }
    } catch (error) {
      console.error("Error during login:", error.message);
      return res.status(500).json({
        success: false,
        message: "Internal Server Error",
      });
    }
  };

// api for profile details
const getProfile = async (req,res) =>{
  try {
    const {userId} = req.body;
    const userData = await userModel.findById(userId).select('-password')
    res.status(201).json({success: true, userData})

  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

// api to update Profile
const updateProfile = async (req,res) =>{
  try {
    const {userId,name,address,dob,gender,phone} = req.body;
    const imageFile = req.file

    if(!name || !dob || !gender || !phone){
      res.status(400).json({success: false,message: "Data Missing"})
    }

    await userModel.findByIdAndUpdate(userId,{name,phone,address: JSON.parse(address),dob,gender})

    if(imageFile){
      // uploade in cloudinary
      const imageUpload = await cloudinary.uploader.upload(imageFile.path,{resource_type: "image"})
      const imageURL = imageUpload.secure_url
      await userModel.findByIdAndUpdate(userId,{image: imageURL});
    }
    res.status(201).json({success: true,message: "Profile updated"})

  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

// api to book appointment
const bookAppointment = async (req, res) => {
  try {
    const { userId, docId, slotDate, slotTime } = req.body;

    // Fetch doctor data
    const DocData = await doctorModel.findById(docId).select("-password");

    if (!DocData.available) {
      return res.status(400).json({ success: false, message: "Doctor not available" });
    }

    // Initialize slots_booked if it doesn't exist
    let slots_booked = DocData.slots_booked;

    // Check for slot availability
    if (slots_booked[slotDate]) {
      if (slots_booked[slotDate].includes(slotTime)) {
        return res.status(400).json({ success: false, message: "Slot not available" });
      } else {
        slots_booked[slotDate].push(slotTime);
      }
    } else {
      slots_booked[slotDate] = [];
      slots_booked[slotDate].push(slotTime)
    }

    // Fetch user data
    const userData = await userModel.findById(userId).select("-password");
    delete userData.slots_booked
  
    const appointmentData = {
      userId,
      docId,
      userData,
      DocData, 
      amount: DocData.fees,
      slotTime,
      slotDate,
      date: Date.now(),
    };

    // Save the new appointment
    const newAppointment = new appointmentModel(appointmentData);
    await newAppointment.save();

    // Save updated slots data in DocData
    await doctorModel.findByIdAndUpdate(docId, { slots_booked });

    res.status(201).json({ success: true, message: "Appointment booked successfully" });
  } catch (error) {
    console.error("Error booking appointment:", error.message);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// api to get user appointment
const listAppointment = async (req,res) =>{
  try {
    const {userId} = req.body
    const appointments = await appointmentModel.find({userId})
    res.status(201).json({success: true,appointments})

  } catch (error) {
    console.log(error);
    res.status(500).res({success: false, message: error.message})
  }
}


export { registerUser, loginUser,getProfile,updateProfile,bookAppointment,listAppointment};
