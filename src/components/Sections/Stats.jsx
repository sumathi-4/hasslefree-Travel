import { motion } from "framer-motion";

function Stats() {

  const stats = [

    {
      id:1,
      number:"10K+",
      title:"Visa Applications"
    },

    {
      id:2,
      number:"98%",
      title:"Success Rate"
    },

    {
      id:3,
      number:"45+",
      title:"Countries Covered"
    },

    {
      id:4,
      number:"24/7",
      title:"Customer Support"
    }

  ];

  return (

    <section className="py-24 bg-[#0B1120]">

      <div className="max-w-7xl mx-auto px-6">

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

          {stats.map((item,index)=>(

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
                scale:1.05
              }}

              className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-10 text-center hover:border-yellow-400 duration-500"
            >

              {/* Number */}

              <h2 className="text-5xl font-bold text-yellow-400">

                {item.number}

              </h2>

              {/* Title */}

              <p className="text-gray-300 mt-4 text-lg">

                {item.title}

              </p>

            </motion.div>

          ))}

        </div>

      </div>

    </section>
  );
}

export default Stats;