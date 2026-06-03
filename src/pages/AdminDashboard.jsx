import { useState, useMemo } from "react";

import { motion, AnimatePresence } from "framer-motion";

import AnalyticsCharts from "./AnalyticsCharts";

import {
  FaUsers,
  FaCheckCircle,
  FaClock,
  FaBell,
  FaSearch,
  FaSignOutAlt,
  FaExclamationTriangle,
  FaGlobe,
  FaFileAlt,
  FaTrash,
  FaEdit,
  FaEye,
  FaDownload,
  FaPlus,
  FaBars,
  FaTimes,
  FaPassport,
  FaUserTie,
  FaBuilding
} from "react-icons/fa";

function AdminDashboard() {

  const [activeCategory,setActiveCategory] = useState("Individuals");

  const [search,setSearch] = useState("");

  const [filterStatus,setFilterStatus] = useState("All");

  const [selectedApplication,setSelectedApplication] = useState(null);

  const [showNotifications,setShowNotifications] = useState(false);

  const [showAddForm,setShowAddForm] = useState(false);

  const [mobileMenu,setMobileMenu] = useState(false);

  const [visaData,setVisaData] = useState({

    Individuals:[

      {
        id:"IND1024",
        name:"Arjun Kumar",
        country:"Canada",
        status:"Pending",
        visaType:"Tourist Visa",
        passport:"MZ4567821",
        email:"arjun@gmail.com",
        phone:"+91 9876543210",
        travelDate:"12 Aug 2026",
        priority:true
      },

      {
        id:"IND1025",
        name:"Sofia",
        country:"Australia",
        status:"Approved",
        visaType:"Student Visa",
        passport:"AX892114",
        email:"sofia@gmail.com",
        phone:"+61 88997766",
        travelDate:"20 Sep 2026",
        priority:false
      }
    ],

    Corporate:[

      {
        id:"COR5021",
        name:"Infosys Pvt",
        country:"USA",
        status:"Processing",
        visaType:"Business Visa",
        passport:"BZ661122",
        email:"hr@infosys.com",
        phone:"+91 8888888888",
        travelDate:"10 Oct 2026",
        priority:true
      }
    ],

    Agents:[

      {
        id:"AG8812",
        name:"Skyline Travels",
        country:"Dubai",
        status:"Rejected",
        visaType:"Agency Visa",
        passport:"TR881122",
        email:"skyline@gmail.com",
        phone:"+971 667788",
        travelDate:"5 Dec 2026",
        priority:true
      }
    ]
  });

  const notifications = [

    "Canada Visa Approved",
    "New Corporate Application Added",
    "Passport Verification Completed",
    "Embassy Updated Status",
    "Agent Uploaded Documents"
  ];

  const filteredApplications = useMemo(()=>{

    return visaData[activeCategory].filter((item)=>{

      const matchesSearch =

        item.name.toLowerCase().includes(search.toLowerCase()) ||

        item.country.toLowerCase().includes(search.toLowerCase()) ||

        item.id.toLowerCase().includes(search.toLowerCase());

      const matchesStatus =

        filterStatus === "All"

        ? true

        : item.status === filterStatus;

      return matchesSearch && matchesStatus;

    });

  },[visaData,activeCategory,search,filterStatus]);

  const updateStatus = (category,id,newStatus)=>{

    setVisaData((prev)=>({

      ...prev,

      [category]:prev[category].map((item)=>

        item.id === id

        ? {...item,status:newStatus}

        : item
      )
    }));
  };

  const deleteApplication = (category,id)=>{

    setVisaData((prev)=>({

      ...prev,

      [category]:prev[category].filter((item)=>item.id !== id)
    }));
  };

  return (

    <div className="min-h-screen bg-gradient-to-br from-[#020617] via-[#071226] to-[#111827] flex overflow-hidden">

      {/* MOBILE MENU */}

      <AnimatePresence>

        {mobileMenu && (

          <motion.div

            initial={{opacity:0}}

            animate={{opacity:1}}

            exit={{opacity:0}}

            className="fixed inset-0 z-[999] bg-black/70 backdrop-blur-sm lg:hidden"
          >

            <motion.div

              initial={{x:-300}}

              animate={{x:0}}

              exit={{x:-300}}

              className="w-[300px] h-full bg-[#0B1120] border-r border-white/10 p-8"
            >

              <div className="flex items-center justify-between">

                <h2 className="text-3xl font-bold text-white">

                  MENU

                </h2>

                <button

                  onClick={()=>setMobileMenu(false)}

                  className="text-white text-3xl"
                >

                  <FaTimes />

                </button>

              </div>

              <div className="space-y-5 mt-16">

                <button

                  onClick={()=>{
                    setActiveCategory("Individuals");
                    setMobileMenu(false);
                  }}

                  className="w-full bg-blue-600 text-white py-4 rounded-2xl font-semibold"
                >

                  Individuals

                </button>

                <button

                  onClick={()=>{
                    setActiveCategory("Corporate");
                    setMobileMenu(false);
                  }}

                  className="w-full bg-yellow-400 text-black py-4 rounded-2xl font-semibold"
                >

                  Corporate

                </button>

                <button

                  onClick={()=>{
                    setActiveCategory("Agents");
                    setMobileMenu(false);
                  }}

                  className="w-full bg-green-500 text-white py-4 rounded-2xl font-semibold"
                >

                  Agents

                </button>

              </div>

            </motion.div>

          </motion.div>
        )}

      </AnimatePresence>

      {/* SIDEBAR */}

      <aside className="w-[300px] hidden lg:flex flex-col justify-between bg-white/5 backdrop-blur-xl border-r border-white/10 p-8">

        <div>

          <h1 className="text-4xl font-bold text-white">

            <span className="text-blue-600">

              HASSLE

            </span>

            <span className="text-yellow-400">

              FREE

            </span>

          </h1>

          <div className="space-y-5 mt-16">

            <button

              onClick={()=>setActiveCategory("Individuals")}

              className={`w-full py-4 rounded-2xl font-semibold flex items-center justify-center gap-3 duration-300

              ${
                activeCategory === "Individuals"

                ? "bg-blue-600 text-white"

                : "bg-white/5 text-gray-300 hover:bg-white/10"
              }
              `}
            >

              <FaPassport />

              Individuals

            </button>

            <button

              onClick={()=>setActiveCategory("Corporate")}

              className={`w-full py-4 rounded-2xl font-semibold flex items-center justify-center gap-3 duration-300

              ${
                activeCategory === "Corporate"

                ? "bg-yellow-400 text-black"

                : "bg-white/5 text-gray-300 hover:bg-white/10"
              }
              `}
            >

              <FaBuilding />

              Corporate

            </button>

            <button

              onClick={()=>setActiveCategory("Agents")}

              className={`w-full py-4 rounded-2xl font-semibold flex items-center justify-center gap-3 duration-300

              ${
                activeCategory === "Agents"

                ? "bg-green-500 text-white"

                : "bg-white/5 text-gray-300 hover:bg-white/10"
              }
              `}
            >

              <FaUserTie />

              Agents

            </button>

          </div>

        </div>

        <div>

          <div className="bg-white/5 border border-white/10 rounded-[30px] p-6">

            <div className="flex items-center gap-4">

              <div className="w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center text-2xl font-bold text-white">

                A

              </div>

              <div>

                <h3 className="text-white font-semibold">

                  Admin 

                </h3>

                <p className="text-gray-400 text-sm">

                  Visa Management

                </p>

              </div>

            </div>

          </div>

          <button className="w-full mt-6 bg-red-500 hover:bg-red-600 duration-300 text-white py-4 rounded-2xl font-semibold flex items-center justify-center gap-3">

            <FaSignOutAlt />

            Sign Out

          </button>

        </div>

      </aside>

      {/* MAIN */}

      <main className="flex-1 p-6 lg:p-12 overflow-y-auto">

        {/* TOP */}

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

          <div className="flex items-center justify-between">

            <div>

              <h2 className="text-4xl lg:text-5xl font-bold text-white">

                Visa Control Center

              </h2>

              <p className="text-gray-400 mt-4 text-lg">

                Manage visa applications professionally.

              </p>

            </div>

            <button

              onClick={()=>setMobileMenu(true)}

              className="lg:hidden w-14 h-14 rounded-2xl bg-white/10 text-white flex items-center justify-center text-2xl"
            >

              <FaBars />

            </button>

          </div>

          <div className="flex items-center gap-5">

            <button

              onClick={()=>setShowAddForm(true)}

              className="bg-blue-600 hover:scale-105 duration-300 text-white px-8 py-4 rounded-2xl font-semibold flex items-center gap-3"
            >

              <FaPlus />

              Add Application

            </button>

            <div

              onClick={()=>setShowNotifications(true)}

              className="relative w-14 h-14 rounded-full bg-white/10 flex items-center justify-center text-white text-xl cursor-pointer"
            >

              <FaBell />

              <span className="absolute -top-1 -right-1 bg-red-500 text-xs w-6 h-6 rounded-full flex items-center justify-center">

                5

              </span>

            </div>

          </div>

        </div>

        {/* ANALYTICS */}

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-8 mt-14">

          <motion.div whileHover={{y:-10}} className="bg-gradient-to-br from-blue-600 to-blue-400 rounded-[35px] p-8 text-white">

            <div className="flex items-center justify-between">

              <div>

                <p>Total Applications</p>

                <h2 className="text-5xl font-bold mt-4">

                  1245

                </h2>

              </div>

              <FaUsers className="text-5xl" />

            </div>

          </motion.div>

          <motion.div whileHover={{y:-10}} className="bg-gradient-to-br from-yellow-400 to-orange-400 rounded-[35px] p-8 text-black">

            <div className="flex items-center justify-between">

              <div>

                <p>Processing</p>

                <h2 className="text-5xl font-bold mt-4">

                  320

                </h2>

              </div>

              <FaClock className="text-5xl" />

            </div>

          </motion.div>

          <motion.div whileHover={{y:-10}} className="bg-gradient-to-br from-green-500 to-emerald-400 rounded-[35px] p-8 text-white">

            <div className="flex items-center justify-between">

              <div>

                <p>Approved</p>

                <h2 className="text-5xl font-bold mt-4">

                  860

                </h2>

              </div>

              <FaCheckCircle className="text-5xl" />

            </div>

          </motion.div>

          <motion.div whileHover={{y:-10}} className="bg-gradient-to-br from-red-500 to-pink-500 rounded-[35px] p-8 text-white">

            <div className="flex items-center justify-between">

              <div>

                <p>Rejected</p>

                <h2 className="text-5xl font-bold mt-4">

                  65

                </h2>

              </div>

              <FaExclamationTriangle className="text-5xl" />

            </div>

          </motion.div>

        </div>

        {/* CHARTS */}

        <AnalyticsCharts />

        {/* SEARCH */}

        <div className="grid lg:grid-cols-2 gap-6 mt-14">

          <div className="relative">

            <FaSearch className="absolute top-1/2 -translate-y-1/2 left-5 text-gray-400" />

            <input

              type="text"

              placeholder="Search applications..."

              value={search}

              onChange={(e)=>setSearch(e.target.value)}

              className="w-full bg-white/5 border border-white/10 rounded-2xl pl-14 pr-6 py-4 text-white outline-none"
            />

          </div>

          <select

            value={filterStatus}

            onChange={(e)=>setFilterStatus(e.target.value)}

            className="bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white outline-none"
          >

            <option className="text-black">

              All

            </option>

            <option className="text-black">

              Pending

            </option>

            <option className="text-black">

              Processing

            </option>

            <option className="text-black">

              Approved

            </option>

            <option className="text-black">

              Rejected

            </option>

          </select>

        </div>

        {/* TABLE */}

        <div className="bg-white/5 border border-white/10 rounded-[35px] overflow-hidden mt-16">

          <div className="overflow-x-auto">

            <table className="w-full text-left">

              <thead className="bg-white/10 text-gray-300">

                <tr>

                  <th className="p-6">

                    ID

                  </th>

                  <th className="p-6">

                    Applicant

                  </th>

                  <th className="p-6">

                    Country

                  </th>

                  <th className="p-6">

                    Visa Type

                  </th>

                  <th className="p-6">

                    Status

                  </th>

                  <th className="p-6">

                    Actions

                  </th>

                </tr>

              </thead>

              <tbody>

                {
                  filteredApplications.length > 0

                  ?

                  filteredApplications.map((item,index)=>(

                    <motion.tr

                      key={item.id}

                      initial={{
                        opacity:0,
                        y:40
                      }}

                      animate={{
                        opacity:1,
                        y:0
                      }}

                      transition={{
                        delay:index * 0.1
                      }}

                      className="border-t border-white/5 hover:bg-white/5 duration-300"
                    >

                      <td className="p-6 text-white">

                        {item.id}

                      </td>

                      <td className="p-6 text-white">

                        {item.name}

                      </td>

                      <td className="p-6 text-white">

                        {item.country}

                      </td>

                      <td className="p-6 text-white">

                        {item.visaType}

                      </td>

                      <td className="p-6">

                        <select

                          value={item.status}

                          onChange={(e)=>

                            updateStatus(
                              activeCategory,
                              item.id,
                              e.target.value
                            )
                          }

                          className="bg-white/10 border border-white/10 rounded-xl px-4 py-2 text-white outline-none"
                        >

                          <option className="text-black">

                            Pending

                          </option>

                          <option className="text-black">

                            Processing

                          </option>

                          <option className="text-black">

                            Approved

                          </option>

                          <option className="text-black">

                            Rejected

                          </option>

                        </select>

                      </td>

                      <td className="p-6">

                        <div className="flex gap-4">

                          <button

                            onClick={()=>setSelectedApplication(item)}

                            className="w-10 h-10 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center"
                          >

                            <FaEye />

                          </button>

                          <button className="w-10 h-10 rounded-full bg-yellow-400/20 text-yellow-400 flex items-center justify-center">

                            <FaEdit />

                          </button>

                          <button className="w-10 h-10 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center">

                            <FaDownload />

                          </button>

                          <button

                            onClick={()=>deleteApplication(activeCategory,item.id)}

                            className="w-10 h-10 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center"
                          >

                            <FaTrash />

                          </button>

                        </div>

                      </td>

                    </motion.tr>
                  ))

                  :

                  <tr>

                    <td
                      colSpan="6"
                      className="text-center py-20 text-gray-400 text-xl"
                    >

                      No Applications Found

                    </td>

                  </tr>
                }

              </tbody>

            </table>

          </div>

        </div>

      </main>

      {/* DETAILS MODAL */}

      <AnimatePresence>

        {
          selectedApplication && (

            <motion.div

              initial={{opacity:0}}

              animate={{opacity:1}}

              exit={{opacity:0}}

              className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[999] px-6"
            >

              <motion.div

                initial={{
                  opacity:0,
                  scale:0.8
                }}

                animate={{
                  opacity:1,
                  scale:1
                }}

                exit={{
                  opacity:0,
                  scale:0.8
                }}

                className="bg-[#0B1120] border border-white/10 rounded-[40px] p-10 w-full max-w-[700px]"
              >

                <div className="flex items-center justify-between">

                  <h2 className="text-4xl font-bold text-white">

                    Application Details

                  </h2>

                  <button

                    onClick={()=>setSelectedApplication(null)}

                    className="text-white text-3xl"
                  >

                    ×

                  </button>

                </div>

                <div className="grid md:grid-cols-2 gap-8 mt-12">

                  <div>

                    <p className="text-gray-400">

                      Applicant

                    </p>

                    <h3 className="text-white text-xl font-semibold mt-2">

                      {selectedApplication.name}

                    </h3>

                  </div>

                  <div>

                    <p className="text-gray-400">

                      Passport

                    </p>

                    <h3 className="text-white text-xl font-semibold mt-2">

                      {selectedApplication.passport}

                    </h3>

                  </div>

                  <div>

                    <p className="text-gray-400">

                      Email

                    </p>

                    <h3 className="text-white text-xl font-semibold mt-2">

                      {selectedApplication.email}

                    </h3>

                  </div>

                  <div>

                    <p className="text-gray-400">

                      Phone

                    </p>

                    <h3 className="text-white text-xl font-semibold mt-2">

                      {selectedApplication.phone}

                    </h3>

                  </div>

                  <div>

                    <p className="text-gray-400">

                      Country

                    </p>

                    <h3 className="text-white text-xl font-semibold mt-2">

                      {selectedApplication.country}

                    </h3>

                  </div>

                  <div>

                    <p className="text-gray-400">

                      Travel Date

                    </p>

                    <h3 className="text-white text-xl font-semibold mt-2">

                      {selectedApplication.travelDate}

                    </h3>

                  </div>

                </div>

              </motion.div>

            </motion.div>
          )
        }

      </AnimatePresence>

    </div>
  );
}

export default AdminDashboard;