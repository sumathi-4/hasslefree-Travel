import { motion } from "framer-motion";

function Hero() {

  return (

    <section className="relative h-screen w-full overflow-hidden">

      {/* Background Image */}

      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=2074&auto=format&fit=crop')",
        }}
      >

        {/* Dark Overlay */}

        <div className="absolute inset-0 bg-black/60"></div>

      </div>

      {/* Content */}

      <div className="relative z-10 flex items-center h-full">

        <div className="max-w-7xl mx-auto px-6">

          {/* Animated Title */}

          <motion.h1
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-5xl md:text-7xl font-bold text-white leading-tight"
          >

            Visa Solutions <br />

            <span className="text-yellow-400">
              Made Simple
            </span>

          </motion.h1>

          {/* Subtitle */}

          <motion.p
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
            className="text-gray-300 mt-6 text-lg max-w-xl"
          >

            Hassle-free visa processing for Individuals,
            Corporates & Travel Agents across the world.

          </motion.p>

          {/* Buttons */}

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
            className="flex gap-4 mt-8"
          >

            <button className="bg-blue-600 hover:bg-yellow-400 hover:text-black duration-300 text-white px-8 py-4 rounded-full font-semibold">

              Apply Now

            </button>

            <button className="border border-white text-white hover:bg-white hover:text-black duration-300 px-8 py-4 rounded-full font-semibold">

              Track Visa

            </button>

          </motion.div>

        </div>

      </div>

    </section>
  );
}

export default Hero;