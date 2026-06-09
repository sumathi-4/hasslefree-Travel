
import { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import axios from "axios";

import toast from "react-hot-toast";

import { motion } from "framer-motion";

import {
  FaEye,
  FaEyeSlash
} from "react-icons/fa";

function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [rememberMe, setRememberMe] = useState(false);

  const [loading, setLoading] = useState(false);

   useEffect(() => {

    const token = localStorage.getItem("adminToken");

    if (token && token !== "undefined") {

      navigate("/admin-dashboard");

    }

  }, []);

  const handleLogin = async (e) => {

    e.preventDefault();

    setLoading(true);

    try {

      const res = await axios.post(
        "http://localhost:5000/api/admin/login",
        {
          email,
          password
        }
      );

      if (res.data.success) {

        toast.success("Login Success");

        localStorage.setItem(
          "isLoggedIn",
          "true"
        );

        localStorage.setItem(
          "userRole",
          "admin"
        );

        localStorage.setItem(
          "adminToken",
          res.data.token
        );

        localStorage.setItem(
          "adminRole",
          res.data.role
        );

        if (rememberMe) {

          localStorage.setItem(
            "rememberAdmin",
            true
          );

        }

        setTimeout(() => {

          navigate("/admin-dashboard");

        }, 1500);

      }

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
        "Login Failed"
      );

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center px-6 py-10 overflow-hidden">

      <motion.div

        initial={{
          opacity: 0,
          y: 50
        }}

        animate={{
          opacity: 1,
          y: 0
        }}

        transition={{
          duration: 0.8
        }}

        className="max-w-6xl w-full bg-white rounded-[40px] shadow-2xl overflow-hidden grid lg:grid-cols-2"
      >

        {/* LEFT SIDE */}

        <div className="p-10 lg:p-16 flex flex-col justify-center">

          {/* LOGO */}

          <h1 className="text-5xl font-black">

            <span className="text-blue-600">
              HASSLE
            </span>

            <span className="text-red-500">
              FREE
            </span>

          </h1>

          {/* TITLE */}

          <h2 className="text-4xl font-bold text-gray-900 mt-10">

            Welcome Back 👋

          </h2>

          <p className="text-gray-500 mt-3 text-lg">

            Login to your admin dashboard

          </p>

          {/* FORM */}

          <form
            onSubmit={handleLogin}
            className="space-y-6 mt-10"
          >

            {/* EMAIL */}

            <div>

              <label className="font-semibold text-gray-700">

                Email Address

              </label>

              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e)=>
                  setEmail(e.target.value)
                }
                required
                className="w-full mt-3 border border-gray-300 rounded-2xl px-5 py-4 outline-none focus:border-blue-600"
              />

            </div>

            {/* PASSWORD */}

            <div>

              <label className="font-semibold text-gray-700">

                Password

              </label>

              <div className="relative mt-3">

                <input
                  type={
                    showPassword
                    ? "text"
                    : "password"
                  }
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e)=>
                    setPassword(e.target.value)
                  }
                  required
                  className="w-full border border-gray-300 rounded-2xl px-5 py-4 pr-14 outline-none focus:border-blue-600"
                />

                <button
                  type="button"
                  onClick={()=>
                    setShowPassword(!showPassword)
                  }
                  className="absolute top-1/2 right-5 -translate-y-1/2 text-gray-500"
                >

                  {
                    showPassword
                    ? <FaEyeSlash />
                    : <FaEye />
                  }

                </button>

              </div>

            </div>

            {/* REMEMBER */}

            <div className="flex items-center gap-3">

              <input
                type="checkbox"
                checked={rememberMe}
                onChange={()=>
                  setRememberMe(!rememberMe)
                }
                className="w-4 h-4"
              />

              <p className="text-gray-600">

                Remember Me

              </p>

            </div>

            {/* BUTTON */}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-red-500 duration-300 text-white py-4 rounded-2xl font-bold text-lg"
            >

              {
                loading
                ? "Logging In..."
                : "Login"
              }

            </button>

          </form>

        </div>

        {/* RIGHT SIDE */}

        <div className="hidden lg:flex items-center justify-center bg-white p-10 relative overflow-hidden">

          <motion.img

            initial={{
              opacity: 0,
              scale: 0.8
            }}

            animate={{
              opacity: 1,
              scale: 1
            }}

            transition={{
              duration: 1
            }}

            src="/travel-login.png"

            alt="travel"

            className="w-[420px] object-contain"
          />

        </div>

      </motion.div>

    </div>
  );
}

export default Login;

