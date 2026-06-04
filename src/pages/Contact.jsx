import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";

import { motion } from "framer-motion";

function Contact() {

  return (

    <>
    
      <Navbar />

      {/* Hero */}

      <section className="relative h-[50vh] flex items-center justify-center">

        <div className="absolute inset-0 bg-white border-b border-gray-100">

        </div>

        <div className="relative z-10 text-center px-6">

          <motion.h1

            initial={{opacity:0,y:80}}
            animate={{opacity:1,y:0}}

            transition={{duration:1}}

            className="text-5xl md:text-7xl font-bold text-gray-900"
          >

            Contact Us

          </motion.h1>

          <p className="text-gray-600 mt-6 text-lg">

            Get in touch with our visa support team.

          </p>

        </div>

      </section>

      {/* Contact Section */}

      <section className="py-24 bg-gray-50">

        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16">

          {/* Left */}

          <motion.div

            initial={{opacity:0,x:-80}}
            whileInView={{opacity:1,x:0}}

            transition={{duration:1}}

            viewport={{once:true}}
          >

            <h2 className="text-5xl font-bold text-gray-900">

              Let’s Connect

            </h2>

            <p className="text-gray-500 mt-8 leading-8 text-lg">

              Contact our support team for visa assistance, travel queries and corporate services.

            </p>

            <div className="space-y-6 mt-10">

              <div className="bg-white shadow-lg rounded-2xl p-6">

                <h3 className="font-bold text-xl">Phone</h3>

                <p className="text-gray-500 mt-2">+91 9876543210</p>

              </div>

              <div className="bg-white shadow-lg rounded-2xl p-6">

                <h3 className="font-bold text-xl">Email</h3>

                <p className="text-gray-500 mt-2">
                  support@hasslefree.com
                </p>

              </div>

              <div className="bg-white shadow-lg rounded-2xl p-6">

                <h3 className="font-bold text-xl">Location</h3>

                <p className="text-gray-500 mt-2">
                  Chennai, Tamil Nadu, India
                </p>

              </div>

            </div>

          </motion.div>

          {/* Form */}

          <motion.div

            initial={{opacity:0,x:80}}
            whileInView={{opacity:1,x:0}}

            transition={{duration:1}}

            viewport={{once:true}}

            className="bg-white shadow-2xl rounded-[40px] p-10"
          >

            <h2 className="text-3xl font-bold text-gray-900">

              Send Message

            </h2>

            <form className="space-y-6 mt-10">

              <input
                type="text"
                placeholder="Your Name"
                className="w-full border border-gray-300 rounded-xl px-5 py-4 outline-none focus:border-blue-600"
              />

              <input
                type="email"
                placeholder="Your Email"
                className="w-full border border-gray-300 rounded-xl px-5 py-4 outline-none focus:border-blue-600"
              />

              <textarea
                rows="5"
                placeholder="Your Message"
                className="w-full border border-gray-300 rounded-xl px-5 py-4 outline-none focus:border-blue-600"
              ></textarea>

              <button className="w-full bg-red-500 hover:bg-red-600 duration-300 text-white py-4 rounded-xl font-semibold">

                Send Message

              </button>

            </form>

          </motion.div>

        </div>

      </section>

      <Footer />

    </>
  );
}

export default Contact;