import { motion } from "framer-motion";

function Testimonials() {

  const testimonials = [

    {
      id:1,
      name:"Arjun Kumar",
      role:"Business Traveler",
      image:"https://randomuser.me/api/portraits/men/32.jpg",
      review:"The visa process was extremely smooth and professional. Highly recommended service."
    },

    {
      id:2,
      name:"Priya Sharma",
      role:"Student Applicant",
      image:"https://randomuser.me/api/portraits/women/44.jpg",
      review:"Excellent support team and very fast document processing experience."
    },

    {
      id:3,
      name:"David Wilson",
      role:"Travel Agent",
      image:"https://randomuser.me/api/portraits/men/75.jpg",
      review:"One of the best visa management platforms for travel agencies."
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

            What Our Clients Say

          </h2>

          <p className="text-gray-600 mt-4 text-lg">

            Trusted by travelers, corporates and agents worldwide.

          </p>

        </motion.div>

        {/* Cards */}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">

          {testimonials.map((item,index)=>(

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

              className="bg-gray-50 border border-gray-100 shadow-sm rounded-3xl p-8 hover:border-yellow-400 duration-500"
            >

              {/* Profile */}

              <div className="flex items-center gap-4">

                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 rounded-full object-cover border-2 border-yellow-400"
                />

                <div>

                  <h3 className="text-gray-900 text-xl font-bold">

                    {item.name}

                  </h3>

                  <p className="text-gray-500">

                    {item.role}

                  </p>

                </div>

              </div>

              {/* Review */}

              <p className="text-gray-700 mt-6 leading-8">

                "{item.review}"

              </p>

            </motion.div>

          ))}

        </div>

      </div>

    </section>
  );
}

export default Testimonials;