import { useState } from "react";

import AdminLogin from "../AdminLogin/AdminLogin";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaWhatsapp
} from "react-icons/fa";
import { Link } from "react-router-dom";

function Footer() {
  const [openAdmin,setOpenAdmin] = useState(false);
  return (

    <footer className="bg-white text-gray-900 pt-20 pb-10 border-t border-gray-100">

      <div className="max-w-7xl mx-auto px-6">

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* Logo */}

          <div>

            <h1 className="text-4xl font-bold">

              <span className="text-blue-600">HASSLE</span>

              <span className="text-yellow-400">FREE</span>

            </h1>

            <p className="text-gray-600 mt-6 leading-7">

              Hassle-free visa processing solutions for
              individuals, corporates and travel agents worldwide.

            </p>

          </div>

          {/* Quick Links */}

          <div>

            <h3 className="text-2xl font-semibold">

              Quick Links

            </h3>

            <ul className="space-y-4 mt-6 text-gray-600">

  <Link to="/">
    <li className="hover:text-yellow-400 cursor-pointer duration-300">
      Home
    </li>
  </Link>

  <Link to="/countries">
    <li className="hover:text-yellow-400 cursor-pointer duration-300">
      Countries
    </li>
  </Link>

  <Link to="/apply-visa">
    <li className="hover:text-yellow-400 cursor-pointer duration-300">
      Apply Visa
    </li>
  </Link>

  <Link to="/contact">
    <li className="hover:text-yellow-400 cursor-pointer duration-300">
      Contact
    </li>
  </Link>

</ul>

          </div>

          {/* Services */}

          <div>

            <h3 className="text-2xl font-semibold">

              Services

            </h3>

           <ul className="space-y-4 mt-6 text-gray-400">

  <Link to="/apply-visa">
    <li className="hover:text-yellow-400 cursor-pointer duration-300">
      Tourist Visa
    </li>
  </Link>

  <Link to="/apply-visa">
    <li className="hover:text-yellow-400 cursor-pointer duration-300">
      Business Visa
    </li>
  </Link>

  <Link to="/apply-visa">
    <li className="hover:text-yellow-400 cursor-pointer duration-300">
      Student Visa
    </li>
  </Link>

  <Link to="/track-visa">
    <li className="hover:text-yellow-400 cursor-pointer duration-300">
      Track Application
    </li>
  </Link>

</ul>

          </div>

          {/* Social */}

          <div>

            <h3 className="text-2xl font-semibold">

              Connect

            </h3>

            <div className="flex gap-4 mt-6">

              <div className="w-12 h-12 rounded-full bg-gray-100 hover:bg-blue-600 hover:text-white duration-300 flex items-center justify-center cursor-pointer">

                <FaFacebookF />

              </div>

              <div className="w-12 h-12 rounded-full bg-gray-100 hover:bg-pink-500 hover:text-white duration-300 flex items-center justify-center cursor-pointer">

                <FaInstagram />

              </div>

              <div className="w-12 h-12 rounded-full bg-gray-100 hover:bg-blue-400 hover:text-white duration-300 flex items-center justify-center cursor-pointer">

                <FaLinkedinIn />

              </div>

              <div className="w-12 h-12 rounded-full bg-gray-100 hover:bg-green-500 hover:text-white duration-300 flex items-center justify-center cursor-pointer">

                <FaWhatsapp />

              </div>

            </div>

          </div>

        </div>

        {/* Bottom */}

        <div className="border-t border-gray-200 mt-16 pt-8 text-center text-gray-500">

          © 2026 HassleFree Travels. All Rights Reserved.

        </div>
       
      </div>
<AdminLogin
  open={openAdmin}
  setOpen={setOpenAdmin}
/>
    </footer>
  );
}

export default Footer;