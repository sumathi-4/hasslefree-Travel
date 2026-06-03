import Navbar from "../components/Navbar/Navbar";

import Footer from "../components/Footer/Footer";

import { motion } from "framer-motion";

import { FaSearch } from "react-icons/fa";

function Countries() {

  const countries = [

    {
      id:1,
      name:"Canada",
      image:"https://images.unsplash.com/photo-1503614472-8c93d56e92ce?q=80&w=2070&auto=format&fit=crop",
      visa:"Tourist Visa",
      processing:"15 Days"
    },

    {
      id:2,
      name:"USA",
      image:"https://images.unsplash.com/photo-1485738422979-f5c462d49f74?q=80&w=2070&auto=format&fit=crop",
      visa:"Business Visa",
      processing:"20 Days"
    },

    {
      id:3,
      name:"United Kingdom",
      image:"https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=2074&auto=format&fit=crop",
      visa:"Visitor Visa",
      processing:"12 Days"
    },

    {
      id:4,
      name:"Australia",
      image:"https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?q=80&w=2070&auto=format&fit=crop",
      visa:"Student Visa",
      processing:"18 Days"
    },

    {
      id:5,
      name:"Dubai",
      image:"https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=2070&auto=format&fit=crop",
      visa:"Tourist Visa",
      processing:"7 Days"
    },

    {
      id:6,
      name:"Singapore",
      image:"https://images.unsplash.com/photo-1525625293386-3f8f99389edd?q=80&w=2070&auto=format&fit=crop",
      visa:"Travel Visa",
      processing:"10 Days"
    }

  ];

  return (

    <>
    
      <Navbar />

      {/* Hero */}

      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">

        {/* Background */}

        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=2074&auto=format&fit=crop')",
          }}
        >

          <div className="absolute inset-0 bg-black/70"></div>

        </div>

        {/* Content */}

        <div className="relative z-10 text-center px-6">

          <motion.h1

            initial={{opacity:0,y:80}}
            animate={{opacity:1,y:0}}

            transition={{duration:1}}

            className="text-5xl md:text-7xl font-bold text-white"
          >

            Explore Countries

          </motion.h1>

          <motion.p

            initial={{opacity:0,y:80}}
            animate={{opacity:1,y:0}}

            transition={{duration:1.2}}

            className="text-gray-300 mt-6 text-lg"
          >

            Discover visa opportunities across the world.

          </motion.p>

        </div>

      </section>

      {/* Countries Section */}

      <section className="py-24 bg-[#F8FAFC]">

        <div className="max-w-7xl mx-auto px-6">

          {/* Top Bar */}

          <div className="flex flex-col lg:flex-row gap-6 lg:items-center lg:justify-between">

            {/* Heading */}

            <div>

              <h2 className="text-4xl font-bold text-[#0B1120]">

                Popular Visa Destinations

              </h2>

              <p className="text-gray-500 mt-3">

                Select your destination and start your application.

              </p>

            </div>

            {/* Search */}

            <div className="relative">

              <input
                type="text"
                placeholder="Search countries..."
                className="bg-white border border-gray-300 rounded-full px-6 py-4 pl-14 outline-none focus:border-blue-600 w-full lg:w-[350px]"
              />

              <FaSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" />

            </div>

          </div>

          {/* Cards */}

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 mt-16">

            {countries.map((item,index)=>(

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

                className="group bg-white rounded-[30px] overflow-hidden shadow-xl hover:shadow-2xl duration-500"
              >

                {/* Image */}

                <div className="h-[300px] overflow-hidden relative">

                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-110 duration-700"
                  />

                  {/* Overlay */}

                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>

                  {/* Country Name */}

                  <div className="absolute bottom-6 left-6">

                    <h3 className="text-3xl font-bold text-white">

                      {item.name}

                    </h3>

                  </div>

                </div>

                {/* Content */}

                <div className="p-8">

                  <div className="flex items-center justify-between">

                    <div>

                      <p className="text-gray-500">

                        Visa Type

                      </p>

                      <h4 className="text-xl font-semibold mt-2">

                        {item.visa}

                      </h4>

                    </div>

                    <div>

                      <p className="text-gray-500">

                        Processing

                      </p>

                      <h4 className="text-xl font-semibold mt-2 text-blue-600">

                        {item.processing}

                      </h4>

                    </div>

                  </div>

                  {/* Button */}

                  <button className="w-full mt-8 bg-[#0B1120] hover:bg-blue-600 duration-300 text-white py-4 rounded-full font-semibold">

                    Apply Now

                  </button>

                </div>

              </motion.div>

            ))}

          </div>

        </div>

      </section>

      <Footer />

    </>
  );
}

export default Countries;