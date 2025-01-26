import React, { useState } from "react";
import { useContext } from "react";
import axios from "axios";
import { AdminContext } from "../context/AdminContext.jsx";
import { toast } from "react-toastify";

const Login = () => {
  const [state, setState] = useState("Admin");

//   backend connections 
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const {setAToken,backendUrl} = useContext(AdminContext)
  const onSubmitHandler = async (event) =>{
    event.preventDefault()

    try {
        if(state === 'Admin'){
            const {data} = await axios.post(backendUrl + '/api/admin/login' ,{email,password})
            if(data.success){
                localStorage.setItem('aToken',data.token)
                console.log(data.token);
                setAToken(data.token)
            }
            else{
                toast.error("Invalid email or password!", {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                  });
            }
        }else{

        }
    } catch (error) {
        console.log(error.message);
    }
  }

  return (
    <form onSubmit={onSubmitHandler} className="min-h-[80vh] flex items-center justify-center bg-gray-50">
      <div className="flex flex-col gap-5 items-start m-auto min-w-[340px] sm:min-w-[400px] p-8 border rounded-2xl bg-white text-gray-700 shadow-lg">
        <p className="text-2xl font-semibold text-center w-full">
          <span className="text-blue-600">{state}</span> Login
        </p>
        <div className="w-full">
          <label htmlFor="email" className="block font-medium mb-1">
            Email
          </label>
          <input
            onChange={(e)=> setEmail(e.target.value)}
            value={email}
            id="email"
            className="border border-gray-300 rounded-lg w-full p-3 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            type="email"
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="w-full">
          <label htmlFor="password" className="block font-medium mb-1">
            Password
          </label>
          <input
            onChange={(e)=> setPassword(e.target.value)}
            value={password}
            id="password"
            className="border border-gray-300 rounded-lg w-full p-3 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            type="password"
            placeholder="Enter your password"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium text-lg hover:bg-blue-700 transition duration-300"
        >
          Login
        </button>
        <p className="text-sm text-center w-full">
          {state === "Admin" ? (
            <>
              Doctor Login?{" "}
              <span
                onClick={() => setState("Doctor")}
                className="text-blue-600 hover:underline cursor-pointer"
              >
                Click here
              </span>
            </>
          ) : (
            <>
              Admin Login?{" "}
              <span
                onClick={() => setState("Admin")}
                className="text-blue-600 hover:underline cursor-pointer"
              >
                Click here
              </span>
            </>
          )}
        </p>
      </div>
    </form>
  );
};

export default Login;
