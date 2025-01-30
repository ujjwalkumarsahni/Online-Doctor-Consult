import express from 'express'
import { appointmentCancel, appointmentCompleted, appointmentsDoctor, doctorDashboard, doctorList, doctorLogin } from '../controllers/doctorController.js';
import authDoctor from '../middlewares/authDoctor.js';

const doctorRouter = express.Router();

doctorRouter.get('/list',doctorList)
doctorRouter.post('/login',doctorLogin)
doctorRouter.get('/appointments',authDoctor,appointmentsDoctor)
doctorRouter.post('/complete-appointment',authDoctor,appointmentCompleted)
doctorRouter.post('/cancel-appointment',authDoctor,appointmentCancel)
doctorRouter.get('/dashboard',authDoctor,doctorDashboard)


export default doctorRouter;