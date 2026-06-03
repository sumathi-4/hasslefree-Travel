import { useState } from "react";

import { Link } from "react-router-dom";

import { FaBars, FaTimes } from "react-icons/fa";

import { motion, AnimatePresence } from "framer-motion";

function Navbar() {

  const [menu,setMenu] = useState(false);

  return (

    <nav className="absolute top-0 left-0 w-full z-50">

      <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">

        {/* Logo */}

        <Link to="/">

          <h1 className="text-3xl md:text-4xl font-bold text-white">

            <span className="text-blue-600">HASSLE</span>

            <span className="text-yellow-400">FREE</span>

          </h1>

        </Link>

        {/* Desktop Menu */}

        <ul className="hidden lg:flex items-center gap-8 text-white font-medium">

          <Link to="/">
            <li className="hover:text-yellow-400 duration-300">
              Home
            </li>
          </Link>

          <Link to="/countries">
            <li className="hover:text-yellow-400 duration-300">
              Countries
            </li>
          </Link>

          <Link to="/apply-visa">
            <li className="hover:text-yellow-400 duration-300">
              Apply Visa
            </li>
          </Link>

          <Link to="/track-visa">
            <li className="hover:text-yellow-400 duration-300">
              Track Visa
            </li>
          </Link>

          <Link to="/about">
            <li className="hover:text-yellow-400 duration-300">
              About
            </li>
          </Link>

          <Link to="/contact">
            <li className="hover:text-yellow-400 duration-300">
              Contact
            </li>
          </Link>

        </ul>

        {/* Desktop Button */}

        <Link to="/apply-visa">

          <button className="hidden lg:block bg-blue-600 hover:bg-yellow-400 hover:text-black duration-300 text-white px-6 py-3 rounded-full font-medium">

            Apply Now

          </button>

        </Link>

        {/* Mobile Icon */}

        <button
          onClick={()=>setMenu(true)}
          className="lg:hidden text-white text-3xl"
        >

          <FaBars />

        </button>

      </div>

      {/* Mobile Sidebar */}

      <AnimatePresence>

        {menu && (

          <>
          
            {/* Overlay */}

            <motion.div

              initial={{opacity:0}}
              animate={{opacity:1}}
              exit={{opacity:0}}

              onClick={()=>setMenu(false)}

              className="fixed inset-0 bg-black/60 z-40"
            />

            {/* Sidebar */}

            <motion.div

              initial={{x:"100%"}}
              animate={{x:0}}
              exit={{x:"100%"}}

              transition={{duration:0.4}}

              className="fixed top-0 right-0 w-[300px] h-screen bg-[#0B1120] z-50 p-8"
            >

              {/* Top */}

              <div className="flex items-center justify-between">

                <h1 className="text-3xl font-bold text-white">

                  <span className="text-blue-600">HASSLE</span>

                  <span className="text-yellow-400">FREE</span>

                </h1>

                <button
                  onClick={()=>setMenu(false)}
                  className="text-white text-3xl"
                >

                  <FaTimes />

                </button>

              </div>

              {/* Links */}

              <ul className="flex flex-col gap-8 mt-16 text-white text-lg font-medium">

                <Link to="/" onClick={()=>setMenu(false)}>
                  <li className="hover:text-yellow-400 duration-300">
                    Home
                  </li>
                </Link>

                <Link to="/countries" onClick={()=>setMenu(false)}>
                  <li className="hover:text-yellow-400 duration-300">
                    Countries
                  </li>
                </Link>

                <Link to="/apply-visa" onClick={()=>setMenu(false)}>
                  <li className="hover:text-yellow-400 duration-300">
                    Apply Visa
                  </li>
                </Link>

                <Link to="/track-visa" onClick={()=>setMenu(false)}>
                  <li className="hover:text-yellow-400 duration-300">
                    Track Visa
                  </li>
                </Link>

                <Link to="/about" onClick={()=>setMenu(false)}>
                  <li className="hover:text-yellow-400 duration-300">
                    About
                  </li>
                </Link>

                <Link to="/contact" onClick={()=>setMenu(false)}>
                  <li className="hover:text-yellow-400 duration-300">
                    Contact
                  </li>
                </Link>

              </ul>

              {/* Button */}

              <Link to="/apply-visa">

                <button className="w-full mt-12 bg-blue-600 hover:bg-yellow-400 hover:text-black duration-300 text-white py-4 rounded-full font-semibold">

                  Apply Now

                </button>

              </Link>

            </motion.div>

          </>

        )}

      </AnimatePresence>

    </nav>
  );
}

export default Navbar;