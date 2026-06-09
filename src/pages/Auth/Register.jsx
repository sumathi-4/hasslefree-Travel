import { useState } from "react";

import { useNavigate } from "react-router-dom";

import { motion } from "framer-motion";

import toast from "react-hot-toast";

function Register() {

  const navigate = useNavigate();

  const [role,setRole] = useState("user");

  const [formData,setFormData] = useState({
    email:"",
    password:""
  });

  const handleRegister = (e)=>{

  e.preventDefault();

  if(
    !formData.email ||
    !formData.password
  ){
    toast.error("Fill all fields");
    return;
  }

  localStorage.setItem(
    "isLoggedIn",
    "true"
  );

  localStorage.setItem(
    "userRole",
    role
  );

  toast.success("Login Successful");
if(role === "admin"){

  navigate("/admin-dashboard");

}else{
navigate("/track-visa");
  
}};

  return (

    <div className="min-h-screen bg-white flex items-center justify-center px-6">

      <motion.div

        initial={{
          opacity:0,
          y:50
        }}

        animate={{
          opacity:1,
          y:0
        }}

        className="w-full max-w-[500px] bg-white shadow-2xl border border-gray-100 rounded-[40px] p-10"
      >

        <h2 className="text-5xl font-bold text-gray-900 text-center">

          User Login
        </h2>

        <div className="mt-10">

         <div className="grid grid-cols-2 gap-4 mt-10">
  <button
    onClick={() => setRole("user")}
    className={`col-start-1 col-end-3 justify-self-center py-4 px-8 rounded-2xl font-semibold
      ${role === "user" ? "bg-blue-600 text-white" : "bg-white/5 text-gray-300"}
    `}
  >
    User Account
  </button>
</div>

          

        </div>

        <form
          onSubmit={handleRegister}
          className="space-y-6 mt-10"
        >

          <input

            type="email"

            placeholder="Email Address"

            value={formData.email}

            onChange={(e)=>
              setFormData({
                ...formData,
                email:e.target.value
              })
            }

            className="w-full bg-gray-50 border border-gray-300 rounded-2xl px-6 py-5 text-gray-900 outline-none focus:border-blue-600"
          />

          <input

            type="password"

            placeholder="Password"

            value={formData.password}

            onChange={(e)=>
              setFormData({
                ...formData,
                password:e.target.value
              })
            }

            className="w-full bg-gray-50 border border-gray-300 rounded-2xl px-6 py-5 text-gray-900 outline-none focus:border-blue-600"
          />

          <button

            type="submit"

            className={`w-full py-5 rounded-2xl font-bold text-lg

            ${
              role === "admin"

              ? "bg-red-500 text-white"

              : "bg-blue-600 text-white"
            }
            `}
          >

            Login

          </button>

        </form>

      </motion.div>

    </div>
  );
}

export default Register;