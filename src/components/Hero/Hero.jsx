import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";

function Hero() {
  const navigate = useNavigate();

  const handleTrackVisaClick = () => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    const userRole = localStorage.getItem("userRole");

    if (isLoggedIn && userRole === "user") {
      navigate("/track-visa");
    } else if (isLoggedIn && userRole === "admin") {
      navigate("/admin-dashboard");
    } else {
      navigate("/user-login", { state: { from: { pathname: "/track-visa" } } });
    }
  };

  return (    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2073&auto=format&fit=crop')",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-block bg-blue-600/20 border border-blue-600/30 text-blue-400 px-6 py-2 rounded-full font-bold text-sm tracking-wider uppercase mb-8 backdrop-blur-sm"
          >
            Hassle-Free Visa Services
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-5xl md:text-8xl font-black text-white leading-[1.1]"
          >
            Your Journey <br />
            <span className="text-blue-600">Starts Here</span>
          </motion.h1>

          {/* Desc */}
          <motion.p
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
            className="text-gray-300 mt-8 text-xl md:text-2xl leading-relaxed max-w-2xl mx-auto"
          >
            Experience the most simplified visa processing with expert
            guidance and real-time application tracking.
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
            className="flex flex-col sm:flex-row gap-6 mt-12 justify-center"
          >
            <button
              onClick={handleTrackVisaClick}
              className="bg-blue-600 hover:bg-blue-700 duration-300 text-white px-10 py-5 rounded-2xl font-bold text-lg shadow-xl shadow-blue-600/20 transform hover:-translate-y-1 active:translate-y-0"
            >
              Track Your Visa
            </button>
            <Link to="/countries">
              <button className="bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 duration-300 text-white px-10 py-5 rounded-2xl font-bold text-lg transform hover:-translate-y-1 active:translate-y-0">
                Explore Countries
              </button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default Hero;