import { motion } from "framer-motion";

import {
  FaShieldAlt,
  FaPassport,
  FaGlobe,
  FaHeadset
} from "react-icons/fa";

function WhyChooseUs() {

  const features = [

    {
      id:1,
      icon:<FaShieldAlt />,
      title:"Trusted Visa Process",
      desc:"Secure and transparent visa processing for all applicants."
    },

    {
      id:2,
      icon:<FaPassport />,
      title:"Fast Documentation",
      desc:"Quick verification and smooth document handling services."
    },

    {
      id:3,
      icon:<FaGlobe />,
      title:"Global Visa Support",
      desc:"Visa assistance for multiple countries worldwide."
    },

    {
      id:4,
      icon:<FaHeadset />,
      title:"24/7 Assistance",
      desc:"Dedicated customer support for all your queries."
    }

  ];

  return (

    <section className="py-24 bg-white overflow-hidden">

      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}

        <motion.div

          initial={{opacity:0,y:80}}
          whileInView={{opacity:1,y:0}}

          transition={{duration:1}}

          viewport={{once:true}}

          className="text-center"
        >

          <h2 className="text-4xl md:text-5xl font-bold text-gray-900">

            Why Choose Us

          </h2>

          <p className="text-gray-500 mt-4 text-lg">

            We simplify your visa journey with speed,
            trust and professionalism.

          </p>

        </motion.div>

        {/* Cards */}

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">

          {features.map((item,index)=>(

            <motion.div

              key={item.id}

              initial={{opacity:0,y:80}}
              whileInView={{opacity:1,y:0}}

              transition={{
                duration:0.8,
                delay:index * 0.2
              }}

              whileHover={{
                y:-15,
                scale:1.03
              }}

              viewport={{once:true}}

              className="group bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl duration-500 border border-gray-100 relative overflow-hidden"
            >

              {/* Glow */}

              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-yellow-400/10 opacity-0 group-hover:opacity-100 duration-500"></div>

              {/* Icon */}

              <div className="relative z-10">

                <div className={`w-20 h-20 rounded-full text-white flex items-center justify-center text-3xl group-hover:bg-yellow-400 group-hover:text-black duration-500 ${item.id === 2 ? 'bg-red-500' : 'bg-blue-600'}`}>

                  {item.icon}

                </div>

                {/* Title */}

                <h3 className="text-2xl font-bold mt-8 text-gray-900">

                  {item.title}

                </h3>

                {/* Description */}

                <p className="text-gray-500 mt-4 leading-7">

                  {item.desc}

                </p>

              </div>

            </motion.div>

          ))}

        </div>

      </div>

    </section>
  );
}

export default WhyChooseUs;