import { motion } from "framer-motion";
import {
  FaArrowRight,
  FaClock,
  FaPassport,
  FaGlobe
} from "react-icons/fa";

function PopularCountries() {

 const countries = [

  {
    id: 1,
    name: "Canada",
    flag: "https://flagcdn.com/w80/ca.png",
    success: "98%",
    time: "15-20 Days",
    image: "https://images.unsplash.com/photo-1517935706615-2717063c2225?q=80&w=2070&auto=format&fit=crop"
  },

  {
    id: 2,
    name: "USA",
    flag: "https://flagcdn.com/w80/us.png",
    success: "96%",
    time: "20-25 Days",
    image: "https://images.unsplash.com/photo-1499092346589-b9b6be3e94b2?q=80&w=2070&auto=format&fit=crop"
  },

  {
    id: 3,
    name: "United Kingdom",
    flag: "https://flagcdn.com/w80/gb.png",
    success: "99%",
    time: "10-15 Days",
    image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=2074&auto=format&fit=crop"
  },

  {
    id: 4,
    name: "Australia",
   flag: "https://flagcdn.com/w80/au.png",
    success: "97%",
    time: "18-22 Days",
    image: "https://images.unsplash.com/photo-1523428096881-5bd79d043006?q=80&w=2070&auto=format&fit=crop"
  },

  {
    id: 5,
    name: "Germany",
     flag: "https://flagcdn.com/w80/de.png",
    success: "98%",
    time: "12-18 Days",
    image: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?q=80&w=2070&auto=format&fit=crop"
  },

  {
    id: 6,
    name: "France",
     flag: "https://flagcdn.com/w80/fr.png",
    success: "97%",
    time: "10-15 Days",
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=2070&auto=format&fit=crop"
  },

  {
    id: 7,
    name: "Singapore",
     flag: "https://flagcdn.com/w80/sg.png",
    success: "99%",
    time: "5-8 Days",
    image: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?q=80&w=2070&auto=format&fit=crop"
  },

  {
    id: 8,
    name: "Japan",
    flag: "https://flagcdn.com/w80/jp.png",
    success: "98%",
    time: "7-12 Days",
    image: "https://images.unsplash.com/photo-1492571350019-22de08371fd3?q=80&w=2070&auto=format&fit=crop"
  }

];

  return (

    <section className="relative py-28 bg-white overflow-hidden">

      {/* BLUE GLOW */}

      <div className="absolute top-[-150px] left-[-150px] w-[450px] h-[450px] bg-[#0F52BA]/10 blur-[120px] rounded-full"></div>

      {/* RED GLOW */}

      <div className="absolute bottom-[-150px] right-[-150px] w-[450px] h-[450px] bg-red-500/10 blur-[120px] rounded-full"></div>

      {/* GRID BG */}

      <div
        className="
          absolute
          inset-0
          opacity-[0.03]
          bg-[linear-gradient(to_right,#0F52BA_1px,transparent_1px),linear-gradient(to_bottom,#0F52BA_1px,transparent_1px)]
          bg-[size:60px_60px]
        "
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* HEADING */}

        <motion.div

          initial={{ opacity: 0, y: 80 }}

          whileInView={{ opacity: 1, y: 0 }}

          transition={{ duration: 1 }}

          viewport={{ once: true }}

          className="text-center"

        >

          <div
            className="
              inline-flex
              items-center
              gap-3
              bg-white/80
              backdrop-blur-xl
              border
              border-gray-200
              px-6
              py-3
              rounded-full
              shadow-lg
            "
          >

            <FaGlobe className="text-[#0F52BA]" />

            <span className="font-bold text-[#0F52BA] tracking-wider uppercase text-sm">

              Top Visa Destinations

            </span>

          </div>

          <h2
            className="
              text-5xl
              md:text-7xl
              font-black
              mt-8
            "
          >

            <span className="text-[#0F52BA]">

              Popular

            </span>

            <span className="text-slate-900">

              {" "}Countries

            </span>

          </h2>

          <p
            className="
              mt-6
              text-slate-500
              text-xl
              max-w-3xl
              mx-auto
            "
          >

            Discover the most requested visa destinations
            with faster processing and higher approval rates.

          </p>

        </motion.div>

        {/* CARDS MARQUEE */}
        <div className="orbit-container mt-16">

  {/* Globe */}
  <div className="globe"></div>

  {/* Plane */}
  <div className="flight">
    ✈️
  </div>
  <div className="flight2">
  ✈️
</div>

  {/* Orbit Cards */}
  <div className="orbit-ring">

    {countries.map((item,index)=>(

      <div
        key={item.id}
        className="country-card"
        style={{
          transform:
            `rotateY(${index * (360 / countries.length)}deg)
             translateZ(700px)`
        }}
      >

        <div
          className="
            group
            relative
            rounded-3xl
            overflow-hidden
            bg-white/10
            backdrop-blur-xl
            border
            border-white/20
            shadow-2xl
          "
        >

          <div className="h-[380px] overflow-hidden">

            <img
              src={item.image}
              alt={item.name}
              className="
                w-full
                h-full
                object-cover
                group-hover:scale-110
                duration-700
              "
            />

          </div>

          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent"></div>

          <div className="absolute bottom-0 p-5 w-full">

            <div className="backdrop-blur-xl bg-white/10 rounded-2xl p-4">

              <h3 className="text-2xl font-bold text-white flex items-center gap-2">

                <img
  src={item.flag}
  alt={item.name}
  className="
    w-16
    h-10
    object-cover
    rounded-lg
    border-2
    border-white/40
    shadow-xl
  "
/>

                {item.name}

              </h3>

              <p className="text-gray-200 mt-2">
                Processing: {item.time}
              </p>

              <p className="text-yellow-300 mt-1">
                Success Rate: {item.success}
              </p>

            </div>

          </div>

        </div>

      </div>

    ))}

  </div>

</div>

      </div>

    </section>

  );

}

export default PopularCountries;