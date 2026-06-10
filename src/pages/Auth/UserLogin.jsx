import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";
function UserLogin(){
  const navigate = useNavigate();
  const location = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [formData, setFormData] = useState({
    email: "mathi@example.com",
    password: "•••••••"
  });

  const from = location.state?.from?.pathname || "/track-visa";

  const handleLogin = (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      toast.error("Please enter both email and password");
      return;
    }

    // Login logic
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("userRole", "user");
    localStorage.setItem("userEmail", formData.email);

    toast.success("Login Successful");
    navigate(from, { replace: true });
  };

  return (
    <div className="min-h-screen bg-[#EFF3F6] flex items-center justify-center px-6 py-10">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-[1050px] w-full bg-white rounded-[40px] shadow-xl overflow-hidden grid lg:grid-cols-2 p-10 lg:p-14 gap-10 items-center"
      >
        {/* LEFT SIDE - FORM */}
        <div className="flex flex-col justify-center">
          {/* LOGO */}
          <Link to="/" className="mb-8 block">
            <h1 className="text-4xl font-extrabold tracking-tight">
              <span className="text-blue-600">HASSLE</span>
              <span className="text-red-500">FREE</span>
            </h1>
          </Link>

          <div className="mb-8">
            <h2 className="text-4xl font-bold text-gray-900">
              Welcome Back 👋
            </h2>
            <p className="text-gray-500 mt-2 text-md">
              Login to track your visa status
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            {/* EMAIL */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-blue-900/70 tracking-wide block">
                Email Address
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className="w-full bg-[#EBF1FA] border border-blue-100 rounded-2xl px-6 py-4 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all text-gray-700 font-semibold"
              />
            </div>

            {/* PASSWORD */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-blue-900/70 tracking-wide block">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                  className="w-full bg-[#EBF1FA] border border-blue-100 rounded-2xl px-6 py-4 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all text-gray-700 font-semibold"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                </button>
              </div>
            </div>

            {/* REMEMBER ME */}
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="remember"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
              />
              <label htmlFor="remember" className="text-gray-500 font-bold text-sm cursor-pointer select-none">
                Remember Me
              </label>
            </div>

            {/* LOGIN BUTTON */}
            <button
              type="submit"
              className="w-full bg-[#1A62FF] hover:bg-blue-700 text-white py-4 rounded-2xl font-bold text-lg shadow-md transition-all duration-300"
            >
              Login
            </button>
          </form>
        </div>

        {/* RIGHT SIDE - ILLUSTRATION */}
        <div className="hidden lg:flex items-center justify-center p-6">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <img
              src="/travel-login.png"
              alt="Travel Illustration"
              className="w-full max-w-[420px] object-contain"
            />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

export default UserLogin;