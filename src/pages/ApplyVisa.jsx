import Navbar from "../components/Navbar/Navbar";

import Footer from "../components/Footer/Footer";

import { motion } from "framer-motion";

function ApplyVisa() {

  return (

    <>
    
      <Navbar />

      {/* Hero Section */}

      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">

        {/* Background */}

        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1521295121783-8a321d551ad2?q=80&w=2070&auto=format&fit=crop')",
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

            Apply For Visa

          </motion.h1>

          <motion.p

            initial={{opacity:0,y:80}}
            animate={{opacity:1,y:0}}

            transition={{duration:1.2}}

            className="text-gray-300 mt-6 text-lg"
          >

            Simple and secure visa application process.

          </motion.p>

        </div>

      </section>

      {/* Form Section */}

      <section className="py-24 bg-[#F8FAFC]">

        <div className="max-w-5xl mx-auto px-6">

          {/* Card */}

          <motion.div

            initial={{opacity:0,y:80}}
            whileInView={{opacity:1,y:0}}

            transition={{duration:1}}

            viewport={{once:true}}

            className="bg-white rounded-[40px] shadow-2xl overflow-hidden grid lg:grid-cols-2"
          >

            {/* Left Side */}

            <div className="bg-[#0B1120] p-12 text-white flex flex-col justify-center">

              <h2 className="text-4xl font-bold leading-tight">

                Start Your Visa Journey Today

              </h2>

              <p className="text-gray-400 mt-6 leading-8">

                Apply for your visa easily with our secure and professional visa processing platform.

              </p>

              {/* Features */}

              <div className="space-y-6 mt-10">

                <div className="flex items-center gap-4">

                  <div className="w-12 h-12 rounded-full bg-yellow-400 text-black flex items-center justify-center font-bold">

                    1

                  </div>

                  <p>Fast Application Process</p>

                </div>

                <div className="flex items-center gap-4">

                  <div className="w-12 h-12 rounded-full bg-yellow-400 text-black flex items-center justify-center font-bold">

                    2

                  </div>

                  <p>Secure Document Upload</p>

                </div>

                <div className="flex items-center gap-4">

                  <div className="w-12 h-12 rounded-full bg-yellow-400 text-black flex items-center justify-center font-bold">

                    3

                  </div>

                  <p>Real-Time Visa Tracking</p>

                </div>

              </div>

            </div>

            {/* Right Side Form */}

            <div className="p-12">

              <h2 className="text-3xl font-bold text-[#0B1120]">

                Visa Application Form

              </h2>

              {/* Form */}

              <form className="space-y-6 mt-10">

                {/* Name */}

                <div>

                  <label className="block mb-2 font-medium">

                    Full Name

                  </label>

                  <input
                    type="text"
                    placeholder="Enter your full name"
                    className="w-full border border-gray-300 rounded-xl px-5 py-4 outline-none focus:border-blue-600"
                  />

                </div>

                {/* Email */}

                <div>

                  <label className="block mb-2 font-medium">

                    Email Address

                  </label>

                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full border border-gray-300 rounded-xl px-5 py-4 outline-none focus:border-blue-600"
                  />

                </div>

                {/* Phone */}

                <div>

                  <label className="block mb-2 font-medium">

                    Phone Number

                  </label>

                  <input
                    type="text"
                    placeholder="Enter your phone number"
                    className="w-full border border-gray-300 rounded-xl px-5 py-4 outline-none focus:border-blue-600"
                  />

                </div>

                {/* Country */}

                <div>

                  <label className="block mb-2 font-medium">

                    Select Country

                  </label>

                  <select
                    className="w-full border border-gray-300 rounded-xl px-5 py-4 outline-none focus:border-blue-600"
                  >

                    <option>Canada</option>
                    <option>USA</option>
                    <option>UK</option>
                    <option>Australia</option>

                  </select>

                </div>

                {/* Category */}

                <div>

                  <label className="block mb-2 font-medium">

                    Visa Category

                  </label>

                  <select
                    className="w-full border border-gray-300 rounded-xl px-5 py-4 outline-none focus:border-blue-600"
                  >

                    <option>Individual</option>
                    <option>Corporate</option>
                    <option>Agent</option>

                  </select>

                </div>

                {/* Upload */}

                <div>

                  <label className="block mb-2 font-medium">

                    Upload Passport

                  </label>

                  <input
                    type="file"
                    className="w-full border border-gray-300 rounded-xl px-5 py-4"
                  />

                </div>

                {/* Button */}

                <button
                  className="w-full bg-blue-600 hover:bg-yellow-400 hover:text-black duration-300 text-white py-4 rounded-xl font-semibold text-lg"
                >

                  Submit Application

                </button>

              </form>

            </div>

          </motion.div>

        </div>

      </section>

      <Footer />

    </>
  );
}

export default ApplyVisa;