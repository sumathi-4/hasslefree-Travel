import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";

import { motion } from "framer-motion";

function About() {

  return (

    <>
    
      <Navbar />

      {/* Hero */}

      <section className="relative h-[50vh] flex items-center justify-center">

        <div className="absolute inset-0 bg-[#0B1120]">

          <div className="absolute inset-0 bg-black/50"></div>

        </div>

        <div className="relative z-10 text-center px-6">

          <motion.h1

            initial={{opacity:0,y:80}}
            animate={{opacity:1,y:0}}

            transition={{duration:1}}

            className="text-5xl md:text-7xl font-bold text-white"
          >

            About Us

          </motion.h1>

          <p className="text-gray-300 mt-6 text-lg">

            Hassle-free visa solutions for global travelers.

          </p>

        </div>

      </section>

      {/* Content */}

      <section className="py-24 bg-[#F8FAFC]">

        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">

          {/* Image */}

          <motion.img

            initial={{opacity:0,x:-80}}
            whileInView={{opacity:1,x:0}}

            transition={{duration:1}}

            viewport={{once:true}}

            src="https://images.unsplash.com/photo-1521295121783-8a321d551ad2?q=80&w=2070&auto=format&fit=crop"

            alt="about"

            className="rounded-[40px] shadow-2xl"
          />

          {/* Text */}

          <motion.div

            initial={{opacity:0,x:80}}
            whileInView={{opacity:1,x:0}}

            transition={{duration:1}}

            viewport={{once:true}}
          >

            <h2 className="text-5xl font-bold text-[#0B1120] leading-tight">

              We Make Visa Processing Simple

            </h2>

            <p className="text-gray-500 mt-8 leading-8 text-lg">

              HassleFree Travels provides secure and professional visa services for individuals, corporates and travel agencies worldwide.

            </p>

            <p className="text-gray-500 mt-6 leading-8 text-lg">

              Our mission is to simplify the visa application process with modern technology and expert support.

            </p>

            <button className="mt-10 bg-blue-600 hover:bg-yellow-400 hover:text-black duration-300 text-white px-8 py-4 rounded-full font-semibold">

              Explore Services

            </button>

          </motion.div>

        </div>

      </section>

      <Footer />

    </>
  );
}

export default About;