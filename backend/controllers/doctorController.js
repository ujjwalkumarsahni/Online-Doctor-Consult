import doctorModel from "../models/doctorModel.js";

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

export {changeAvailablity,doctorList}