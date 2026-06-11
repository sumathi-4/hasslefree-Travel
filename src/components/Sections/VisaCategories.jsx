import { motion } from "framer-motion";

import {
  FaUser,
  FaBuilding,
  FaHandshake,
  FaArrowRight
} from "react-icons/fa";

function VisaCategories() {

  const categories = [

    {
      id: 1,
      title: "Individuals",
      icon: <FaUser />,
      desc: "Personal tourist, student and visitor visa services with fast processing.",
      color: "from-[#0F52BA] to-blue-700"
    },

    {
      id: 2,
      title: "Corporate",
      icon: <FaBuilding />,
      desc: "Business and employee visa solutions for companies and enterprises.",
      color: "from-red-500 to-red-700"
    },

    {
      id: 3,
      title: "Agents",
      icon: <FaHandshake />,
      desc: "Premium visa partnership services for travel agencies and consultants.",
      color: "from-yellow-400 to-yellow-500"
    }

  ];

 return (

<section className="relative py-32 overflow-hidden bg-white">

  {/* BACKGROUND GLOWS */}

  <div className="absolute top-[-200px] left-[-150px] w-[500px] h-[500px] bg-[#0F52BA]/10 blur-[150px] rounded-full"></div>

  <div className="absolute bottom-[-200px] right-[-150px] w-[500px] h-[500px] bg-red-500/10 blur-[150px] rounded-full"></div>

  {/* GRID */}

  <div
    className="
      absolute
      inset-0
      opacity-[0.03]
      bg-[linear-gradient(to_right,#0F52BA_1px,transparent_1px),linear-gradient(to_bottom,#0F52BA_1px,transparent_1px)]
      bg-[size:80px_80px]
    "
  />

  <div className="max-w-7xl mx-auto px-6 relative z-10">

    {/* TITLE */}

    <div className="text-center">

      <div
        className="
          inline-flex
          items-center
          gap-3
          px-8
          py-3
          rounded-full
          bg-white/30
          backdrop-blur-xl
          border
          border-white/40
          shadow-lg
        "
      >

        <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>

        <span className="font-bold tracking-[3px] text-[#0F52BA] uppercase text-sm">

          Premium Visa Services

        </span>

      </div>

      <h2 className="text-5xl md:text-7xl font-black mt-8">

        <span className="text-[#0F52BA]">
          Visa
        </span>

        <span className="text-slate-900">
          {" "}Categories
        </span>

      </h2>

      <p
        className="
          mt-6
          text-slate-500
          text-xl
          max-w-3xl
          mx-auto
          leading-9
        "
      >

        Smart visa solutions for individuals,
        companies and travel agencies.

      </p>

    </div>

    {/* CARDS */}

    <div className="grid lg:grid-cols-3 gap-10 mt-24">

      {categories.map((item,index)=>(

        <motion.div

          key={item.id}

          initial={{
            opacity:0,
            y:80
          }}

          whileInView={{
            opacity:1,
            y:0
          }}

          transition={{
            duration:0.8,
            delay:index * 0.2
          }}

          whileHover={{
            y:-20,
            scale:1.04,
            rotateY:5
          }}

          className="
            group
            relative
            overflow-hidden
            rounded-[40px]
            bg-white/20
            backdrop-blur-[22px]
            border
            border-white/40
            shadow-[0_20px_60px_rgba(15,82,186,0.12)]
            hover:shadow-[0_25px_80px_rgba(239,68,68,0.18)]
            duration-700
            p-10
          "
        >

          {/* TOP BORDER */}

          <div
            className={`
              absolute
              top-0
              left-0
              h-2
              w-full
              bg-gradient-to-r
              ${item.color}
            `}
          />

          {/* GLOW */}

          <div
            className="
              absolute
              -top-24
              -right-24
              w-72
              h-72
              rounded-full
              bg-gradient-to-br
              from-[#0F52BA]/20
              to-red-500/20
              blur-3xl
              group-hover:scale-125
              duration-700
            "
          />

          {/* ROTATING RING */}

          <div
            className="
              absolute
              -top-12
              -right-12
              w-40
              h-40
              rounded-full
              border-[20px]
              border-[#0F52BA]/10
              group-hover:rotate-180
              duration-700
            "
          />

          {/* CONTENT */}

          <div className="relative z-10">

            <motion.div

              animate={{
                y:[0,-10,0]
              }}

              transition={{
                duration:3,
                repeat:Infinity
              }}

              whileHover={{
                rotate:360
              }}

              className={`
                w-28
                h-28
                rounded-[32px]
                bg-gradient-to-br
                ${item.color}
                flex
                items-center
                justify-center
                text-white
                text-5xl
                shadow-xl
              `}
            >

              {item.icon}

            </motion.div>

            <h3
              className="
                text-4xl
                font-black
                mt-10
                text-slate-900
              "
            >

              {item.title}

            </h3>

            <p
              className="
                mt-6
                text-slate-500
                leading-8
                text-lg
              "
            >

              {item.desc}

            </p>

            <button
              className="
                mt-10
                flex
                items-center
                gap-3
                bg-gradient-to-r
                from-[#0F52BA]
                via-blue-700
                to-red-500
                text-white
                px-8
                py-4
                rounded-2xl
                font-bold
                hover:scale-105
                duration-300
                shadow-xl
              "
            >

              Explore More

              <FaArrowRight />

            </button>

          </div>

          {/* HOVER OVERLAY */}

          <div
            className="
              absolute
              inset-0
              opacity-0
              group-hover:opacity-100
              duration-700
              bg-gradient-to-br
              from-[#0F52BA]/5
              via-transparent
              to-red-500/5
            "
          />

        </motion.div>

      ))}

    </div>

  </div>

</section>

);

}

export default VisaCategories;