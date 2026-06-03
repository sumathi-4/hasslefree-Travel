import { useState,useEffect,useRef } from "react";

import { Link,useNavigate } from "react-router-dom";

import {
  FaBars,
  FaTimes,
  FaUserCircle,
  FaUser,
  FaUserShield,
  FaSignOutAlt,
  FaChevronDown
} from "react-icons/fa";

import { motion,AnimatePresence } from "framer-motion";

function Navbar() {

  const [menu,setMenu] = useState(false);

  const [profileDropdown,setProfileDropdown] = useState(false);

  const [isLoggedIn,setIsLoggedIn] = useState(false);

  const [userRole,setUserRole] = useState("");

  const navigate = useNavigate();

  const dropdownRef = useRef();

  useEffect(()=>{

    const loginStatus = localStorage.getItem("isLoggedIn");

    const role = localStorage.getItem("userRole");

    if(loginStatus){

      setIsLoggedIn(true);

      setUserRole(role);
    }

  },[]);

  useEffect(()=>{

    const handleClickOutside = (event)=>{

      if(
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ){
        setProfileDropdown(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return ()=>{

      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };

  },[]);

  const handleLogout = ()=>{

    localStorage.removeItem("isLoggedIn");

    localStorage.removeItem("userRole");

    setIsLoggedIn(false);

    setUserRole("");

    navigate("/");

  };

  

  return (

    <nav className="absolute top-0 left-0 w-full z-50">

      <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">

        {/* LOGO */}

        <Link to="/">

          <h1 className="text-3xl md:text-4xl font-bold text-white">

            <span className="text-blue-600">

              HASSLE

            </span>

            <span className="text-yellow-400">

              FREE

            </span>

          </h1>

        </Link>

        {/* DESKTOP MENU */}

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

        {/* RIGHT SIDE */}

        <div className="hidden lg:flex items-center gap-5">

          <Link to="/apply-visa">

            <button className="bg-blue-600 hover:bg-yellow-400 hover:text-black duration-300 text-white px-6 py-3 rounded-full font-medium">

              Apply Now

            </button>

          </Link>

          {/* PROFILE */}

          <div
            className="relative"
            ref={dropdownRef}
          >

            <button

              onClick={()=>
                setProfileDropdown(!profileDropdown)
              }

              className="flex items-center gap-2 bg-white/10 hover:bg-white/20 duration-300 px-5 py-3 rounded-full text-white"
            >

              <FaUserCircle className="text-2xl" />

              <FaChevronDown className="text-sm" />

            </button>

            <AnimatePresence>

              {profileDropdown && (

                <motion.div

                  initial={{
                    opacity:0,
                    y:20
                  }}

                  animate={{
                    opacity:1,
                    y:0
                  }}

                  exit={{
                    opacity:0,
                    y:20
                  }}

                  className="absolute top-[70px] right-0 w-[260px] bg-[#0B1120] border border-white/10 rounded-3xl p-4 backdrop-blur-xl shadow-2xl"
                >

                  {!isLoggedIn ? (

 <div className="flex flex-col gap-4"> 

    <Link to="/login">

      <button className="w-full flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-700 duration-300 text-white px-5 py-4 rounded-2xl">

        <FaUser />

        Login

      </button>

    </Link>

    <Link to="/register">

      <button className="w-full flex items-center justify-center gap-3 bg-yellow-400 hover:bg-yellow-500 duration-300 text-black px-5 py-4 rounded-2xl">

        <FaUserShield />

        Register

      </button>

    </Link>

  </div>

) : (

                    <div>

                      <div className="bg-white/5 rounded-2xl p-5 mb-4">

                        <h3 className="text-white text-lg font-semibold">

                          Logged In

                        </h3>

                        <p className="text-gray-400 mt-1 capitalize">

                          Role : {userRole}

                        </p>

                      </div>

                      {userRole === "user" && (

                        <Link to="/track-visa">

                          <button className="w-full mb-3 bg-blue-600 hover:bg-blue-700 duration-300 text-white py-4 rounded-2xl font-medium">

                            Track Visa

                          </button>

                        </Link>

                      )}

                      {userRole === "admin" && (

                       <Link to="/visa-control-center">

                          <button className="w-full mb-3 bg-yellow-400 hover:bg-yellow-500 duration-300 text-black py-4 rounded-2xl font-medium">

                            Open Admin Panel

                          </button>

                        </Link>

                      )}

                      <button

                        onClick={handleLogout}

                        className="w-full flex items-center justify-center gap-3 bg-red-500 hover:bg-red-600 duration-300 text-white py-4 rounded-2xl font-medium"
                      >

                        <FaSignOutAlt />

                        Logout

                      </button>

                    </div>

                  )}

                </motion.div>
              )}

            </AnimatePresence>

          </div>

        </div>

        {/* MOBILE ICON */}

        <button
          onClick={()=>setMenu(true)}
          className="lg:hidden text-white text-3xl"
        >

          <FaBars />

        </button>

      </div>

      {/* MOBILE SIDEBAR */}

      <AnimatePresence>

        {menu && (

          <>

            {/* OVERLAY */}

            <motion.div

              initial={{opacity:0}}

              animate={{opacity:1}}

              exit={{opacity:0}}

              onClick={()=>setMenu(false)}

              className="fixed inset-0 bg-black/60 z-40"
            />

            {/* SIDEBAR */}

            <motion.div

              initial={{x:"100%"}}

              animate={{x:0}}

              exit={{x:"100%"}}

              transition={{duration:0.4}}

              className="fixed top-0 right-0 w-[300px] h-screen bg-[#0B1120] z-50 p-8 overflow-y-auto"
            >

              {/* TOP */}

              <div className="flex items-center justify-between">

                <h1 className="text-3xl font-bold text-white">

                  <span className="text-blue-600">

                    HASSLE

                  </span>

                  <span className="text-yellow-400">

                    FREE

                  </span>

                </h1>

                <button
                  onClick={()=>setMenu(false)}
                  className="text-white text-3xl"
                >

                  <FaTimes />

                </button>

              </div>

              {/* LINKS */}

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

              {/* MOBILE PROFILE */}

              <div className="mt-12 space-y-4">

                {!isLoggedIn ? (

  <div className="space-y-4">

    <Link to="/login">

      <button className="w-full bg-blue-600 hover:bg-blue-700 duration-300 text-white py-4 rounded-2xl font-semibold">

        Login

      </button>

    </Link>

    <Link to="/register">

      <button className="w-full bg-yellow-400 hover:bg-yellow-500 duration-300 text-black py-4 rounded-2xl font-semibold">

        Register

      </button>

    </Link>

  </div>

): (

                  <>

                    <div className="bg-white/5 border border-white/10 rounded-3xl p-5">

                      <h3 className="text-white text-xl font-semibold">

                        Logged In

                      </h3>

                      <p className="text-gray-400 mt-2 capitalize">

                        Role : {userRole}

                      </p>

                    </div>

                    <button

                      onClick={handleLogout}

                      className="w-full bg-red-500 hover:bg-red-600 duration-300 text-white py-4 rounded-2xl font-semibold"
                    >

                      Logout

                    </button>

                  </>

                )}

              </div>

            </motion.div>

          </>
        )}

      </AnimatePresence>

    </nav>
  );
}

export default Navbar;