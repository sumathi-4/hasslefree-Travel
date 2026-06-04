import { motion } from "framer-motion";

function Loader() {

  return (

    <div className="fixed inset-0 bg-white flex items-center justify-center z-[9999]">

      <div className="text-center">

        {/* Logo */}

        <motion.h1

          initial={{opacity:0,scale:0.5}}
          animate={{opacity:1,scale:1}}

          transition={{
            duration:1,
            repeat:Infinity,
            repeatType:"reverse"
          }}

          className="text-5xl md:text-7xl font-bold text-gray-900"
        >

          <span className="text-blue-600">HASSLE</span>

          <span className="text-yellow-400">FREE</span>

        </motion.h1>

        {/* Loading Text */}

        <motion.p

          initial={{opacity:0}}
          animate={{opacity:1}}

          transition={{
            duration:1,
            repeat:Infinity,
            repeatType:"reverse"
          }}

          className="text-gray-600 mt-6 tracking-[6px]"
        >

          LOADING...

        </motion.p>

      </div>

    </div>
  );
}

export default Loader;