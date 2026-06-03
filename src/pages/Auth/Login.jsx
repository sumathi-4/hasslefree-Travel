import { useState } from "react";

import { useNavigate } from "react-router-dom";

import { motion } from "framer-motion";

import toast from "react-hot-toast";

function Login() {

  const navigate = useNavigate();

  const [role,setRole] = useState("user");

  const [formData,setFormData] = useState({
    email:"",
    password:""
  });

 const handleLogin = (e)=>{

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

  navigate("/visa-control-center");

}else{

  navigate("/track-visa");
}};
  return (

    <div className="min-h-screen bg-gradient-to-br from-[#020617] via-[#071226] to-[#111827] flex items-center justify-center px-6">

      <motion.div

        initial={{
          opacity:0,
          y:50
        }}

        animate={{
          opacity:1,
          y:0
        }}

        className="w-full max-w-[500px] bg-white/5 backdrop-blur-xl border border-white/10 rounded-[40px] p-10"
      >

        <h2 className="text-5xl font-bold text-white text-center">

          Login
        </h2>

        <p className="text-gray-400 text-center mt-4">

          Access your visa portal
        </p>

        {/* ROLE */}

        <div className="mt-10">

          <button

            onClick={()=>setRole("user")}

            className={`py-4 rounded-2xl font-semibold duration-300

            ${
              role === "user"

              ? "bg-blue-600 text-white"

              : "bg-white/5 text-gray-300"
            }
            `}
          >

            User

          </button>

          <button

            onClick={()=>setRole("admin")}

            className={`py-4 rounded-2xl font-semibold duration-300

            ${
              role === "admin"

              ? "bg-yellow-400 text-black"

              : "bg-white/5 text-gray-300"
            }
            `}
          >

            Admin

          </button>

        </div>

        {/* FORM */}

        <form
          onSubmit={handleLogin}
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

            className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 text-white outline-none"
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

            className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 text-white outline-none"
          />

          <button

            type="submit"

            className={`w-full py-5 rounded-2xl font-bold text-lg duration-300

            ${
              role === "admin"

              ? "bg-yellow-400 hover:bg-yellow-500 text-black"

              : "bg-blue-600 hover:bg-blue-700 text-white"
            }
            `}
          >

            Login as {role}

          </button>

        </form>

      </motion.div>

    </div>
  );
}

export default Login;