import doctorModel from "../models/doctorModel.js";
import  bcrypt  from 'bcrypt';
import  jwt  from 'jsonwebtoken';

const changeAvailablity = async (req,res) =>{
    try {
        const {docId} = req.body;
        const docData = await doctorModel.findById(docId)
        await doctorModel.findByIdAndUpdate(docId,{available: !docData.available})
        res.status(200).json({success: true, message: "Availablity changed"})
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server error, please try again later" });
    }
}

const doctorList = async (req,res) =>{
    try {
        const doctors = await doctorModel.find({}).select(['-password','-email'])
        res.status(200).json({success: true, doctors})

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server error, please try again later" });
    }
}

const doctorLogin = async (req,res) =>{
    try {
        const {email,password} = req.body
        const doctor = await doctorModel.findOne({email})
        if(!doctor){
            res.status(400).json({success: false,message: "Invlide credentials"})
        }

        const isMatch = await bcrypt.compare(password,doctor.password);

        if(isMatch){
            const token = jwt.sign({id: doctor._id},process.env.JWT_SECRET)
            res.status(200).json({success: true,token})
        }else{
            res.status(400).json({success: false, message: "Invlide credentials"})
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server error, please try again later" });
    }
}

export {changeAvailablity,doctorList,doctorLogin}