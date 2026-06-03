import { motion } from "framer-motion";

function PopularCountries() {

  const countries = [

    {
      id: 1,
      name: "Canada",
      image:
        "https://images.unsplash.com/photo-1503614472-8c93d56e92ce?q=80&w=2070&auto=format&fit=crop",
      time: "15-20 Days",
    },

    {
      id: 2,
      name: "USA",
      image:
        "https://images.unsplash.com/photo-1485738422979-f5c462d49f74?q=80&w=2070&auto=format&fit=crop",
      time: "20-25 Days",
    },

    {
      id: 3,
      name: "UK",
      image:
        "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=2074&auto=format&fit=crop",
      time: "10-15 Days",
    },

    {
      id: 4,
      name: "Australia",
      image:
        "https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?q=80&w=2070&auto=format&fit=crop",
      time: "18-22 Days",
    },

  ];

  return (

    <section className="bg-[#0B1120] py-24 overflow-hidden">

      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}

        <motion.div
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="text-center"
        >

          <h2 className="text-4xl md:text-5xl font-bold text-white">

            Popular Destinations

          </h2>

          <p className="text-gray-400 mt-4 text-lg">

            Explore top countries and start your visa journey today.

          </p>

        </motion.div>

        {/* Cards */}

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">

          {countries.map((item, index) => (

            <motion.div
              key={item.id}

              initial={{ opacity: 0, y: 80 }}
              whileInView={{ opacity: 1, y: 0 }}

              transition={{
                duration: 0.8,
                delay: index * 0.2,
              }}

              viewport={{ once: true }}

              whileHover={{
                y: -15,
                scale: 1.03,
              }}

              className="group relative rounded-3xl overflow-hidden cursor-pointer"
            >

              {/* Image */}

              <div className="h-[450px] overflow-hidden">

                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-110 duration-700"
                />

              </div>

              {/* Overlay */}

              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"></div>

              {/* Content */}

              <div className="absolute bottom-0 p-6 w-full">

                <div className="backdrop-blur-md bg-white/10 border border-white/10 rounded-2xl p-5">

                  <h3 className="text-3xl font-bold text-white">

                    {item.name}

                  </h3>

                  <p className="text-gray-300 mt-2">

                    Processing Time: {item.time}

                  </p>

                  <button className="mt-5 bg-yellow-400 hover:bg-blue-600 hover:text-white duration-300 text-black px-5 py-3 rounded-full font-semibold">

                    Apply Visa

                  </button>

                </div>

              </div>

            </motion.div>

          ))}

        </div>

      </div>

    </section>
  );
}

export default PopularCountries;