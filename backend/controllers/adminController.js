


// API for the adding doctor

const addDoctor = async () => {
    try {
        const {name,email,password,speciality,degree,experience,about,fees,address} = req.body;
        const imageFile = req.file;

        console.log({name,email,password,speciality,degree,experience,about,fees,address},imageFile);
        
        res.send("success");
    } catch (error) {
        
    }
}

export {addDoctor}