
import { motion } from "framer-motion";
import heroImage from "../../assets/hero-travel.png";
import { Link, useNavigate } from "react-router-dom";

function Hero() {

  const navigate = useNavigate();

  const handleTrackVisaClick = () => {

    const isLoggedIn =
      localStorage.getItem("isLoggedIn") === "true";

    const userRole =
      localStorage.getItem("userRole");

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

  };

  return (

    <section
      className="
        relative
        min-h-screen
        overflow-hidden
        flex
        items-center
        bg-gradient-to-br
        from-[#F8FAFC]
        via-white
        to-blue-50
        pt-32
      "
    >

      {/* BLUE GLOW */}

      <div
        className="
          absolute
          top-[-180px]
          left-[-150px]
          w-[500px]
          h-[500px]
          bg-[#0F52BA]/15
          blur-[140px]
          rounded-full
        "
      />

      {/* RED GLOW */}

      <div
        className="
          absolute
          bottom-[-180px]
          right-[-120px]
          w-[450px]
          h-[450px]
          bg-red-500/10
          blur-[140px]
          rounded-full
        "
      />

      <div
        className="
          max-w-[1500px]
          mx-auto
          px-6
          w-full
          grid
          lg:grid-cols-2
          gap-10
          items-center
          relative
          z-10
        "
      >

        {/* LEFT CONTENT */}

        <motion.div

          initial={{
            opacity:0,
            x:-60
          }}

          animate={{
            opacity:1,
            x:0
          }}

          transition={{
            duration:1
          }}

        >

          {/* GLASS BADGE */}

          <div
            className="
              inline-block
              px-7
              py-3
              rounded-full
              bg-white/50
              backdrop-blur-2xl
              border
              border-white/30
              text-[#0F52BA]
              font-bold
              tracking-[2px]
              text-sm
              mb-8
              shadow-xl
            "
          >

            HASSLE-FREE PREMIUM VISA SERVICES

          </div>

          {/* TITLE */}

          <h1
            className="
              text-6xl
              md:text-[90px]
              font-black
              leading-[1]
            "
          >

            <span className="text-slate-900">
              Your Journey
            </span>

            <br />

            <span className="text-[#0F52BA]">
              Starts
            </span>

            <span className="text-red-500">
              {" "}Here
            </span>

          </h1>

          {/* DESCRIPTION */}

          <p
            className="
              mt-8
              text-slate-600
              text-xl
              md:text-2xl
              leading-relaxed
              max-w-2xl
            "
          >

            Experience world-class visa processing
            with expert guidance, real-time tracking,
            fast approvals and smooth global travel support.

          </p>

          {/* BUTTONS */}

          <div
            className="
              flex
              flex-wrap
              gap-5
              mt-12
            "
          >

            <button

              onClick={handleTrackVisaClick}

              className="
                bg-[#0F52BA]
                hover:bg-red-500
                text-white
                px-10
                py-5
                rounded-2xl
                font-bold
                text-lg
                backdrop-blur-xl
                shadow-[0_15px_40px_rgba(15,82,186,0.35)]
                hover:scale-105
                duration-300
              "
            >

              Track Visa

            </button>

            <Link to="/countries">

              <button

                className="
                  bg-white/50
                  backdrop-blur-2xl
                  border
                  border-white/30
                  hover:bg-red-500
                  hover:text-white
                  text-red-500
                  px-10
                  py-5
                  rounded-2xl
                  font-bold
                  text-lg
                  shadow-xl
                  hover:scale-105
                  duration-300
                "
              >

                Explore Countries

              </button>

            </Link>

          </div>

          {/* GLASS STATS CARD */}

          <div className="mt-14">

            <div
              className="
                inline-flex
                flex-wrap
                items-center
                gap-10
                bg-white/40
                backdrop-blur-2xl
                border
                border-white/30
                px-8
                py-6
                rounded-[30px]
                shadow-[0_10px_40px_rgba(0,0,0,0.08)]
              "
            >

              <div>

                <h3
                  className="
                    text-3xl
                    font-black
                    text-[#0F52BA]
                  "
                >

                  25K+

                </h3>

                <p className="text-slate-600">
                  Visa Approved
                </p>

              </div>

              <div>

                <h3
                  className="
                    text-3xl
                    font-black
                    text-red-500
                  "
                >

                  98%

                </h3>

                <p className="text-slate-600">
                  Success Rate
                </p>

              </div>

              <div>

                <h3
                  className="
                    text-3xl
                    font-black
                    text-[#0F52BA]
                  "
                >

                  50+

                </h3>

                <p className="text-slate-600">
                  Countries
                </p>

              </div>

            </div>

          </div>

        </motion.div>

        {/* RIGHT IMAGE */}

        <motion.div

          initial={{
            opacity:0,
            x:60
          }}

          animate={{
            opacity:1,
            x:0
          }}

          transition={{
            duration:1
          }}

          className="
            relative
            flex
            justify-center
          "
        >

          {/* IMAGE GLOW */}

          <div
            className="
              absolute
              w-[650px]
              h-[650px]
              bg-[#0F52BA]/10
              blur-[140px]
              rounded-full
            "
          />

          {/* IMAGE */}

          <img
            src={heroImage}
            alt="Travel"
            className="
              relative
              z-10
              w-full
              max-w-[850px]
              object-contain
              scale-125
              drop-shadow-[0_30px_60px_rgba(0,0,0,0.25)]
              animate-float
            "
          />

        </motion.div>

      </div>

    </section>

  );

}

export default Hero;

