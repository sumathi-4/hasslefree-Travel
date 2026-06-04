import { motion } from "framer-motion";

import {
  FaWpforms,
  FaFileUpload,
  FaSearch,
  FaCheckCircle
} from "react-icons/fa";

function VisaProcess() {

  const steps = [

    {
      id:1,
      icon:<FaWpforms />,
      title:"Fill Application",
      desc:"Complete your visa application form with accurate details."
    },

    {
      id:2,
      icon:<FaFileUpload />,
      title:"Upload Documents",
      desc:"Upload passport, photos and required supporting documents."
    },

    {
      id:3,
      icon:<FaSearch />,
      title:"Verification Process",
      desc:"Our team verifies your documents and application."
    },

    {
      id:4,
      icon:<FaCheckCircle />,
      title:"Visa Approval",
      desc:"Receive your approved visa and travel confidently."
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

            Visa Process

          </h2>

          <p className="text-gray-500 mt-4 text-lg">

            Simple and hassle-free visa application process.

          </p>

        </motion.div>

        {/* Timeline */}

        <div className="relative mt-24">

          {/* Line */}

          <div className="hidden lg:block absolute top-24 left-0 w-full h-1 bg-blue-100"></div>

          {/* Steps */}

          <div className="grid lg:grid-cols-4 gap-10 relative">

            {steps.map((item,index)=>(

              <motion.div

                key={item.id}

                initial={{opacity:0,y:80}}
                whileInView={{opacity:1,y:0}}

                transition={{
                  duration:0.8,
                  delay:index * 0.2
                }}

                viewport={{once:true}}

                whileHover={{
                  y:-15,
                  scale:1.03
                }}

                className="relative bg-white rounded-3xl p-8 shadow-xl border border-gray-100 hover:shadow-2xl duration-500 z-10"
              >

                {/* Circle */}

                <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-14 h-14 rounded-full bg-yellow-400 flex items-center justify-center text-2xl text-black shadow-lg">

                  {item.icon}

                </div>

                {/* Content */}

                <div className="pt-12 text-center">

                  <h3 className="text-2xl font-bold text-gray-900">

                    {item.title}

                  </h3>

                  <p className="text-gray-500 mt-4 leading-7">

                    {item.desc}

                  </p>

                </div>

              </motion.div>

            ))}

          </div>

        </div>

      </div>

    </section>
  );
}

export default VisaProcess;