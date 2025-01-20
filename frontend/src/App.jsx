import React from 'react';
import {Routes,Route} from 'react-router-dom';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Doctors from './pages/Doctors.jsx';
import About from './pages/About.jsx';
import Contect from './pages/Contect.jsx';
import MyProfile from './pages/MyProfile.jsx';
import MyAppointments from './pages/MyAppointments.jsx';
import Appointment from './pages/Appointment.jsx';

const App = () => {
  return (
    <div className='mx-4 sm:mx-[4%]'>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/doctors' element={<Doctors />}/>
        <Route path='/doctors:speciality' element={<Doctors />}/>
        <Route path='/about' element={<About />}/>
        <Route path='/contect' element={<Contect />}/>
        <Route path='/my-profile' element={<MyProfile />}/>
        <Route path='/my-appointments' element={<MyAppointments />}/>
        <Route path='/appointment:docId' element={<Appointment />}/>
      </Routes>
    </div>
  )
}

export default App