import React, { useState } from "react";
import { assets } from "./../assets/assets";
import Footer from "../components/Footer";

const MyProfile = () => {
  const [userData, setUserData] = useState({
    name: "Edward Vincent",
    image: assets.profile_pic,
    email: "richardjameswap@gmail.com",
    phone: "+1  123 456 7890",
    address: {
      line1: "57th Cross, Richmond ",
      line2: "Circle, Church Road, London",
    },
    gender: "Male",
    dob: "2000-01-20",
  });
  const [isEdit, setIsEdit] = useState(false);
  return (
    <>
      <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-md mt-10">
        <div className="flex flex-col items-center sm:flex-row sm:items-start">
          <img
            src={userData.image}
            alt="Profile"
            className="w-32 h-32 rounded-full border-2 border-gray-200"
          />
          <div className="sm:ml-6 mt-4 sm:mt-0 text-center sm:text-left">
            {isEdit ? (
              <input
                type="text"
                value={userData.name}
                className="border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring focus:ring-blue-200"
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, name: e.target.value }))
                }
              />
            ) : (
              <h2 className="text-xl font-bold text-gray-800">
                {userData.name}
              </h2>
            )}
          </div>
        </div>

        <hr className="my-6 border-gray-300" />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <h3 className="font-medium text-gray-600">Email:</h3>
            {isEdit ? (
              <input
                type="email"
                value={userData.email}
                className="border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring focus:ring-blue-200"
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, email: e.target.value }))
                }
              />
            ) : (
              <p className="text-gray-800">{userData.email}</p>
            )}
          </div>
          <div>
            <h3 className="font-medium text-gray-600">Phone:</h3>
            {isEdit ? (
              <input
                type="text"
                value={userData.phone}
                className="border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring focus:ring-blue-200"
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, phone: e.target.value }))
                }
              />
            ) : (
              <p className="text-gray-800">{userData.phone}</p>
            )}
          </div>
          <div className="col-span-2">
            <h3 className="font-medium text-gray-600">Address:</h3>
            {isEdit ? (
              <div className="space-y-2">
                <input
                  type="text"
                  value={userData.address.line1}
                  className="w-full border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring focus:ring-blue-200"
                  onChange={(e) =>
                    setUserData((prev) => ({
                      ...prev,
                      address: { ...prev.address, line1: e.target.value },
                    }))
                  }
                />
                <input
                  type="text"
                  value={userData.address.line2}
                  className="w-full border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring focus:ring-blue-200"
                  onChange={(e) =>
                    setUserData((prev) => ({
                      ...prev,
                      address: { ...prev.address, line2: e.target.value },
                    }))
                  }
                />
              </div>
            ) : (
              <p className="text-gray-800">
                {userData.address.line1} <br />
                {userData.address.line2}
              </p>
            )}
          </div>
        </div>

        <hr className="my-6 border-gray-300" />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <h3 className="font-medium text-gray-600">Gender:</h3>
            {isEdit ? (
              <select
                value={userData.gender}
                className="w-full border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring focus:ring-blue-200"
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, gender: e.target.value }))
                }
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            ) : (
              <p className="text-gray-800">{userData.gender}</p>
            )}
          </div>
          <div>
            <h3 className="font-medium text-gray-600">Birthday:</h3>
            {isEdit ? (
              <input
                type="date"
                value={userData.dob}
                className="w-full border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring focus:ring-blue-200"
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, dob: e.target.value }))
                }
              />
            ) : (
              <p className="text-gray-800">{userData.dob}</p>
            )}
          </div>
        </div>

        <div className="flex justify-end mt-6">
          {isEdit ? (
            <button
              className="bg-blue-500 text-white px-6 py-2 rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200"
              onClick={() => setIsEdit(false)}
            >
              Save Information
            </button>
          ) : (
            <button
              className="bg-gray-500 text-white px-6 py-2 rounded-md shadow hover:bg-gray-600 focus:outline-none focus:ring focus:ring-gray-200"
              onClick={() => setIsEdit(true)}
            >
              Edit
            </button>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default MyProfile;
