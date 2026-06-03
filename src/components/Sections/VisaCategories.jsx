import { motion } from "framer-motion";

import {
  FaUser,
  FaBuilding,
  FaHandshake
} from "react-icons/fa";

function VisaCategories() {

  const categories = [

    {
      id: 1,
      title: "Individuals",
      icon: <FaUser />,
      desc: "Personal tourist, student and visitor visas."
    },

    {
      id: 2,
      title: "Corporate",
      icon: <FaBuilding />,
      desc: "Business and employee visa processing services."
    },

    {
      id: 3,
      title: "Agents",
      icon: <FaHandshake />,
      desc: "Visa solutions for travel agents and agencies."
    }

  ];

  return (

    <section className="bg-[#F8FAFC] py-24">

      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}

        <motion.div
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="text-center"
        >

          <h2 className="text-4xl md:text-5xl font-bold text-[#0B1120]">

            Visa Categories

          </h2>

          <p className="text-gray-500 mt-4 text-lg">

            Choose the perfect visa solution for your travel needs.

          </p>

        </motion.div>

        {/* Cards */}

        <div className="grid md:grid-cols-3 gap-8 mt-16">

          {categories.map((item, index) => (

            <motion.div
              key={item.id}

              initial={{ opacity: 0, y: 80 }}
              whileInView={{ opacity: 1, y: 0 }}

              transition={{
                duration: 0.8,
                delay: index * 0.2
              }}

              whileHover={{
                y: -15,
                rotateY: 6,
                scale: 1.03
              }}

              viewport={{ once: true }}

              className="group bg-white rounded-3xl p-10 shadow-xl hover:shadow-2xl duration-500 border border-gray-100 relative overflow-hidden"
            >

              {/* Glow Effect */}

              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-yellow-400/10 opacity-0 group-hover:opacity-100 duration-500"></div>

              {/* Icon */}

              <div className="relative z-10">

                <div className="w-20 h-20 rounded-full bg-blue-600 text-white flex items-center justify-center text-3xl group-hover:bg-yellow-400 group-hover:text-black duration-500">

                  {item.icon}

                </div>

                {/* Title */}

                <h3 className="text-3xl font-bold mt-8 text-[#0B1120]">

                  {item.title}

                </h3>

                {/* Description */}

                <p className="text-gray-500 mt-4 leading-7">

                  {item.desc}

                </p>

                {/* Button */}

                <button className="mt-8 bg-[#0B1120] text-white px-6 py-3 rounded-full hover:bg-blue-600 duration-300">

                  Explore More

                </button>

              </div>

            </motion.div>

          ))}

        </div>

      </div>

    </section>
  );
}

export default VisaCategories;