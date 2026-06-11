import { useState,useEffect,useRef } from "react";

import { Link,useNavigate } from "react-router-dom";

import {
  FaBars,
  FaTimes,
  FaUserCircle,
  FaUser,
  FaUserShield
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

    <nav className="fixed top-5 left-0 w-full z-50 px-4 md:px-8">

      <div
        className="
          max-w-7xl
          mx-auto
          bg-white/30
          backdrop-blur-3xl
          border
          border-white/40
          px-8
          py-4
          rounded-full
          flex
          items-center
          justify-between
          shadow-[0_8px_40px_rgba(15,82,186,0.18)]
        "
      >

        {/* LOGO */}

        <Link
          to="/"
          className="flex items-center gap-3"
        >

          <img
            src="https://cdn-icons-png.flaticon.com/512/201/201623.png"
            alt="logo"
            className="
              w-11
              h-11
              object-contain
              drop-shadow-xl
            "
          />

          <h1 className="text-2xl font-black">

            <span className="text-[#0F52BA]">
              HASSLE
            </span>

            <span className="text-red-500">
              FREE
            </span>

          </h1>

        </Link>

        {/* DESKTOP MENU */}

        <ul
          className="
            hidden
            lg:flex
            items-center
            gap-10
            font-bold
            text-[17px]
            text-[#0F52BA]
          "
        >

          <Link to="/">

            <li
              className="
                relative
                hover:text-red-500
                duration-300
                cursor-pointer
                after:absolute
                after:left-0
                after:-bottom-2
                after:w-0
                after:h-[3px]
                after:rounded-full
                after:bg-gradient-to-r
                after:from-[#0F52BA]
                after:to-red-500
                after:duration-300
                hover:after:w-full
              "
            >
              Home
            </li>

          </Link>

          <Link to="/countries">

            <li
              className="
                relative
                hover:text-red-500
                duration-300
                cursor-pointer
                after:absolute
                after:left-0
                after:-bottom-2
                after:w-0
                after:h-[3px]
                after:rounded-full
                after:bg-gradient-to-r
                after:from-[#0F52BA]
                after:to-red-500
                after:duration-300
                hover:after:w-full
              "
            >
              Countries
            </li>

          </Link>

          <button

            onClick={() => {

              if (isLoggedIn && userRole === "user") {

                navigate("/track-visa");

              } else if (isLoggedIn && userRole === "admin") {

                navigate("/admin-dashboard");

              } else {

                navigate("/user-login", {
                  state: {
                    from: {
                      pathname: "/track-visa"
                    }
                  }
                });

              }

            }}

            className="
              relative
              hover:text-red-500
              duration-300
              cursor-pointer
              after:absolute
              after:left-0
              after:-bottom-2
              after:w-0
              after:h-[3px]
              after:rounded-full
              after:bg-gradient-to-r
              after:from-[#0F52BA]
              after:to-red-500
              after:duration-300
              hover:after:w-full
            "
          >

            <li className="list-none">
              Track Visa
            </li>

          </button>

          <Link to="/about">

            <li
              className="
                relative
                hover:text-red-500
                duration-300
                cursor-pointer
                after:absolute
                after:left-0
                after:-bottom-2
                after:w-0
                after:h-[3px]
                after:rounded-full
                after:bg-gradient-to-r
                after:from-[#0F52BA]
                after:to-red-500
                after:duration-300
                hover:after:w-full
              "
            >
              About
            </li>

          </Link>

          <Link to="/contact">

            <li
              className="
                relative
                hover:text-red-500
                duration-300
                cursor-pointer
                after:absolute
                after:left-0
                after:-bottom-2
                after:w-0
                after:h-[3px]
                after:rounded-full
                after:bg-gradient-to-r
                after:from-[#0F52BA]
                after:to-red-500
                after:duration-300
                hover:after:w-full
              "
            >
              Contact
            </li>

          </Link>

        </ul>

        {/* PROFILE */}

        <div
          className="hidden lg:flex items-center"
          ref={dropdownRef}
        >

          <button

            onClick={() =>
              setProfileDropdown(!profileDropdown)
            }

            className="
              flex
              items-center
              justify-center
              w-14
              h-14
              rounded-full
              bg-white/30
              hover:bg-white/50
              border
              border-white/40
              backdrop-blur-2xl
              duration-300
              shadow-xl
            "
          >

           <FaUserCircle
              className="
                text-4xl
                text-yellow-300
                drop-shadow-[0_0_12px_rgba(250,204,21,0.8)]
              "
            />

          </button>

          <AnimatePresence>

            {profileDropdown && (

              <motion.div

                initial={{
                  opacity:0,
                  y:15
                }}

                animate={{
                  opacity:1,
                  y:0
                }}

                exit={{
                  opacity:0,
                  y:15
                }}

                className="
                  absolute
                  right-0
                  top-20
                  w-60
                  bg-white
                  rounded-3xl
                  overflow-hidden
                  shadow-2xl
                "
              >

                <button

                  onClick={() => {

                    setProfileDropdown(false);

                    navigate("/admin-login");

                  }}

                  className="
                    w-full
                    flex
                    items-center
                    gap-4
                    px-6
                    py-5
                    hover:bg-blue-50
                    duration-300
                  "
                >

                  <FaUserShield
                    className="
                      text-[#0F52BA]
                      text-xl
                    "
                  />

                  <span className="font-semibold">
                    Admin Login
                  </span>

                </button>

                <button

                  onClick={() => {

                    setProfileDropdown(false);

                    navigate("/user-login");

                  }}

                  className="
                    w-full
                    flex
                    items-center
                    gap-4
                    px-6
                    py-5
                    hover:bg-red-50
                    duration-300
                  "
                >

                  <FaUser
                    className="
                      text-red-500
                      text-xl
                    "
                  />

                  <span className="font-semibold">
                    User Login
                  </span>

                </button>

              </motion.div>

            )}

          </AnimatePresence>

        </div>

        {/* MOBILE MENU */}

        <button
          onClick={()=>setMenu(true)}
          className="
            lg:hidden
            text-[#0F52BA]
            text-3xl
          "
        >

          <FaBars />

        </button>

      </div>

      {/* MOBILE SIDEBAR */}

      <AnimatePresence>

        {menu && (

          <>

            <motion.div

              initial={{opacity:0}}

              animate={{opacity:1}}

              exit={{opacity:0}}

              onClick={()=>setMenu(false)}

              className="
                fixed
                inset-0
                bg-black/60
                z-40
              "
            />

            <motion.div

              initial={{x:"100%"}}

              animate={{x:0}}

              exit={{x:"100%"}}

              transition={{duration:0.4}}

              className="
                fixed
                top-0
                right-0
                w-[320px]
                h-screen
                bg-white
                z-50
                p-8
                overflow-y-auto
              "
            >

              <div className="flex items-center justify-between">

                <h1 className="text-2xl font-black">

                  <span className="text-[#0F52BA]">
                    HASSLE
                  </span>

                  <span className="text-red-500">
                    FREE
                  </span>

                </h1>

                <button
                  onClick={()=>setMenu(false)}
                  className="
                    text-3xl
                    text-gray-700
                  "
                >

                  <FaTimes />

                </button>

              </div>

              <ul
                className="
                  flex
                  flex-col
                  gap-8
                  mt-16
                  text-lg
                  font-semibold
                  text-[#0F52BA]
                "
              >

                <Link to="/" onClick={()=>setMenu(false)}>
                  <li className="hover:text-red-500 duration-300">
                    Home
                  </li>
                </Link>

                <Link to="/countries" onClick={()=>setMenu(false)}>
                  <li className="hover:text-red-500 duration-300">
                    Countries
                  </li>
                </Link>

                <Link to="/about" onClick={()=>setMenu(false)}>
                  <li className="hover:text-red-500 duration-300">
                    About
                  </li>
                </Link>

                <Link to="/contact" onClick={()=>setMenu(false)}>
                  <li className="hover:text-red-500 duration-300">
                    Contact
                  </li>
                </Link>

              </ul>

            </motion.div>

          </>

        )}

      </AnimatePresence>

    </nav>

  );

}

export default Navbar;