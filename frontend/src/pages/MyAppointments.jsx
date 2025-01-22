import React, { useContext } from 'react';
import { AppContext } from './../context/AppContext';

const MyAppointments = () => {
  const { doctors } = useContext(AppContext);
  return (
    <div className="max-w-6xl mx-auto p-6 bg-white mt-10">
      <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        My Appointments
      </h1>
      <div className="space-y-6">
        {doctors.slice(0, 3).map((item, index) => (
          <div
            key={index}
            className="flex flex-col sm:flex-row items-center sm:items-start bg-gray-50 p-4 rounded-md shadow-md"
          >
            {/* Doctor Image */}
            <div className="flex-shrink-0 mb-4 sm:mb-0">
              <img
                src={item.image}
                alt={item.name}
                className="w-24 h-24 rounded-full border-2 border-gray-200"
              />
            </div>
            
            {/* Doctor Details */}
            <div className="sm:ml-6 flex-1 text-center sm:text-left">
              <h2 className="text-lg font-semibold text-gray-800">{item.name}</h2>
              <p className="text-gray-600">{item.speciality}</p>
              <div className="mt-2 text-gray-600">
                <p className="font-medium">Address:</p>
                <p>{item.address.line1}</p>
                <p>{item.address.line2}</p>
              </div>
              <p className="mt-2 text-gray-800">
                <span className="font-semibold">Date & Time:</span> 25, July, 2024 | 8:30 PM
              </p>
            </div>
            
            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 mt-4 sm:mt-0">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200"
              >
                Pay Online
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-md shadow hover:bg-red-600 focus:outline-none focus:ring focus:ring-red-200"
              >
                Cancel Appointment
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyAppointments;
