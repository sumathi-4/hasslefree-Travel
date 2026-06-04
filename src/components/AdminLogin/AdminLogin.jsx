import { motion, AnimatePresence } from "framer-motion";

import { FaTimes, FaLock } from "react-icons/fa";

import { useNavigate } from "react-router-dom";

function AdminLogin({ open, setOpen }) {

  const navigate = useNavigate();

  const handleLogin = (e) => {

    e.preventDefault();

    setOpen(false);

    navigate("/visa-control-center");
  };

  return (

    <AnimatePresence>

      {open && (

        <>
        
          {/* Overlay */}

          <motion.div

            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}

            onClick={() => setOpen(false)}

            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[999]"
          />

          {/* Modal */}

          <motion.div

            initial={{
              opacity:0,
              scale:0.8,
              y:80
            }}

            animate={{
              opacity:1,
              scale:1,
              y:0
            }}

            exit={{
              opacity:0,
              scale:0.8,
              y:80
            }}

            transition={{ duration:0.4 }}

            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white border border-gray-100 rounded-[40px] p-10 w-[95%] max-w-[500px] z-[1000] shadow-2xl"
          >

            {/* Close */}

            <button
              onClick={() => setOpen(false)}
              className="absolute top-6 right-6 text-gray-900 text-2xl"
            >

              <FaTimes />

            </button>

            {/* Icon */}

            <div className="w-24 h-24 rounded-full bg-blue-600 flex items-center justify-center mx-auto text-white text-4xl">

              <FaLock />

            </div>

            {/* Title */}

            <h2 className="text-4xl font-bold text-gray-900 text-center mt-8">

              Admin Access

            </h2>

            <p className="text-gray-600 text-center mt-4">

              Secure visa management portal login.

            </p>

            {/* Form */}

            <form
              onSubmit={handleLogin}
              className="space-y-6 mt-10"
            >

              <input
                type="text"
                placeholder="Admin ID"
                className="w-full bg-gray-50 border border-gray-300 text-gray-900 rounded-2xl px-6 py-4 outline-none focus:border-blue-600"
              />

              <input
                type="password"
                placeholder="Password"
                className="w-full bg-gray-50 border border-gray-300 text-gray-900 rounded-2xl px-6 py-4 outline-none focus:border-blue-600"
              />

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-yellow-400 hover:text-black duration-300 text-white py-4 rounded-2xl font-semibold text-lg"
              >

                Access Dashboard

              </button>

            </form>

          </motion.div>

        </>

      )}

    </AnimatePresence>
  );
}

export default AdminLogin;