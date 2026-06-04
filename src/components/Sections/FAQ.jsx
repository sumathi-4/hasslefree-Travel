import { useState } from "react";

import { motion } from "framer-motion";

import { FaChevronDown } from "react-icons/fa";

function FAQ() {

  const [open,setOpen] = useState(null);

  const faqs = [

    {
      id:1,
      question:"How long does visa processing take?",
      answer:"Visa processing depends on the country and visa type. Usually it takes 7-20 working days."
    },

    {
      id:2,
      question:"Can I track my visa application?",
      answer:"Yes, you can easily track your application status using your application ID."
    },

    {
      id:3,
      question:"What documents are required?",
      answer:"Passport, photographs, bank statements and travel documents are generally required."
    },

    {
      id:4,
      question:"Do you provide corporate visa services?",
      answer:"Yes, we provide dedicated visa solutions for corporates and travel agencies."
    }

  ];

  return (

    <section className="py-24 bg-gray-50">

      <div className="max-w-4xl mx-auto px-6">

        {/* Heading */}

        <motion.div

          initial={{opacity:0,y:80}}
          whileInView={{opacity:1,y:0}}

          transition={{duration:1}}

          viewport={{once:true}}

          className="text-center"
        >

          <h2 className="text-4xl md:text-5xl font-bold text-gray-900">

            Frequently Asked Questions

          </h2>

          <p className="text-gray-500 mt-4 text-lg">

            Everything you need to know about visa applications.

          </p>

        </motion.div>

        {/* FAQ */}

        <div className="mt-16 space-y-6">

          {faqs.map((item)=>(

            <motion.div

              key={item.id}

              initial={{opacity:0,y:50}}
              whileInView={{opacity:1,y:0}}

              transition={{duration:0.6}}

              viewport={{once:true}}

              className="bg-white rounded-2xl shadow-lg overflow-hidden"
            >

              {/* Question */}

              <button

                onClick={()=>setOpen(open === item.id ? null : item.id)}

                className="w-full flex items-center justify-between p-6 text-left"
              >

                <h3 className="text-xl font-semibold text-gray-900">

                  {item.question}

                </h3>

                <FaChevronDown
                  className={`duration-300 ${
                    open === item.id ? "rotate-180 text-red-500" : "text-gray-400"
                  }`}
                />

              </button>

              {/* Answer */}

              {open === item.id && (

                <div className="px-6 pb-6 text-gray-500 leading-7">

                  {item.answer}

                </div>

              )}

            </motion.div>

          ))}

        </div>

      </div>

    </section>
  );
}

export default FAQ;