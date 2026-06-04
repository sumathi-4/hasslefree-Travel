import Navbar from "../components/Navbar/Navbar";

import Footer from "../components/Footer/Footer";

import { motion } from "framer-motion";

function TrackVisa() {

  return (

    <>
    
      <Navbar />

      {/* Hero */}

      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">

        {/* Background */}

        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=2070&auto=format&fit=crop')",
          }}
        >

          <div className="absolute inset-0 bg-black/70"></div>

        </div>

        {/* Content */}

        <div className="relative z-10 text-center px-6">

          <motion.h1

            initial={{opacity:0,y:80}}
            animate={{opacity:1,y:0}}

            transition={{duration:1}}

            className="text-5xl md:text-7xl font-bold text-white"
          >

            Track Your Visa

          </motion.h1>

          <motion.p

            initial={{opacity:0,y:80}}
            animate={{opacity:1,y:0}}

            transition={{duration:1.2}}

            className="text-gray-300 mt-6 text-lg"
          >

            Check your visa application status instantly.

          </motion.p>

        </div>

      </section>

      {/* Tracking Section */}

      <section className="py-24 bg-white">

        <div className="max-w-6xl mx-auto px-6">

          {/* Search Card */}

          <motion.div

            initial={{opacity:0,y:80}}
            whileInView={{opacity:1,y:0}}

            transition={{duration:1}}

            viewport={{once:true}}

            className="bg-white rounded-[40px] shadow-2xl p-10"
          >

            <h2 className="text-4xl font-bold text-gray-900 text-center">

              Visa Application Tracking

            </h2>

            <p className="text-gray-500 mt-4 text-center">

              Enter your application details to track status.

            </p>

            {/* Inputs */}

            <div className="grid md:grid-cols-2 gap-6 mt-12">

              <input
                type="text"
                placeholder="Application ID"
                className="border border-gray-300 rounded-xl px-5 py-4 outline-none focus:border-blue-600"
              />

              <input
                type="text"
                placeholder="Passport Number"
                className="border border-gray-300 rounded-xl px-5 py-4 outline-none focus:border-blue-600"
              />

            </div>

            {/* Button */}

            <button
              className="w-full mt-8 bg-red-500 hover:bg-red-600 duration-300 text-white py-4 rounded-xl font-semibold text-lg"
            >

              Track Application

            </button>

          </motion.div>

          {/* Status Card */}

          <motion.div

            initial={{opacity:0,y:80}}
            whileInView={{opacity:1,y:0}}

            transition={{duration:1.2}}

            viewport={{once:true}}

            className="bg-blue-600 rounded-[40px] p-10 mt-16 text-white shadow-2xl"
          >

            {/* Top */}

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

              <div>

                <h3 className="text-3xl font-bold">

                  Application ID: VISA2034

                </h3>

                <p className="text-gray-400 mt-3">

                  Canada Tourist Visa

                </p>

              </div>

              {/* Status */}

              <div className="bg-green-500/20 border border-green-500 text-green-400 px-6 py-3 rounded-full w-fit">

                Approved

              </div>

            </div>

            {/* Timeline */}

            <div className="grid md:grid-cols-4 gap-6 mt-16">

              {/* Step */}

              <div className="text-center">

                <div className="w-16 h-16 rounded-full bg-yellow-400 text-black flex items-center justify-center mx-auto font-bold text-xl">

                  1

                </div>

                <h4 className="mt-5 text-xl font-semibold">

                  Applied

                </h4>

              </div>

              {/* Step */}

              <div className="text-center">

                <div className="w-16 h-16 rounded-full bg-yellow-400 text-black flex items-center justify-center mx-auto font-bold text-xl">

                  2

                </div>

                <h4 className="mt-5 text-xl font-semibold">

                  Documents Verified

                </h4>

              </div>

              {/* Step */}

              <div className="text-center">

                <div className="w-16 h-16 rounded-full bg-yellow-400 text-black flex items-center justify-center mx-auto font-bold text-xl">

                  3

                </div>

                <h4 className="mt-5 text-xl font-semibold">

                  Processing

                </h4>

              </div>

              {/* Step */}

              <div className="text-center">

                <div className="w-16 h-16 rounded-full bg-green-500 text-white flex items-center justify-center mx-auto font-bold text-xl">

                  4

                </div>

                <h4 className="mt-5 text-xl font-semibold">

                  Approved

                </h4>

              </div>

            </div>

          </motion.div>

        </div>

      </section>

      <Footer />

    </>
  );
}

export default TrackVisa;