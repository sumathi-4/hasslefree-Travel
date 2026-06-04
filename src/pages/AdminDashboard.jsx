import { useState, useMemo } from "react";

import { motion, AnimatePresence } from "framer-motion";

import AnalyticsCharts from "./AnalyticsCharts";

import toast from "react-hot-toast";

import {
  FaUsers,
  FaCheckCircle,
  FaClock,
  FaBell,
  FaSearch,
  FaSignOutAlt,
  FaExclamationTriangle,
  FaTrash,
  FaEdit,
  FaEye,
  FaDownload,
  FaPlus,
  FaBars,
  FaTimes,
  FaPassport,
  FaUserTie,
  FaBuilding,
  FaUserCircle,
  FaFilter,
  FaGlobe,
  FaFileAlt
} from "react-icons/fa";

function AdminDashboard() {

  const [activeCategory,setActiveCategory] = useState("All");

  const [search,setSearch] = useState("");

  const [filterStatus,setFilterStatus] = useState("All");

  const [selectedApplication,setSelectedApplication] = useState(null);

  const [showNotifications,setShowNotifications] = useState(false);

  const [showAddForm,setShowAddForm] = useState(false);

  const [mobileMenu,setMobileMenu] = useState(false);

  const [editData,setEditData] = useState(null);

  const [formData,setFormData] = useState({
    name:"",
    country:"",
    visaType:"",
    passport:"",
    email:"",
    phone:"",
    travelDate:""
  });

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

  const allApplications = useMemo(()=>{

    return [

      ...visaData.Individuals.map((item)=>({
        ...item,
        category:"Individuals"
      })),

      ...visaData.Corporate.map((item)=>({
        ...item,
        category:"Corporate"
      })),

      ...visaData.Agents.map((item)=>({
        ...item,
        category:"Agents"
      }))
    ];

  },[visaData]);

  const filteredApplications = useMemo(()=>{

    return allApplications.filter((item)=>{

      const matchesCategory =

        activeCategory === "All"
        ? true
        : item.category === activeCategory;

      const matchesSearch =

        item.name.toLowerCase().includes(search.toLowerCase()) ||

        item.country.toLowerCase().includes(search.toLowerCase()) ||

        item.id.toLowerCase().includes(search.toLowerCase());

      const matchesStatus =

        filterStatus === "All"

        ? true

        : item.status === filterStatus;

      return matchesCategory && matchesSearch && matchesStatus;

    });

  },[
    allApplications,
    activeCategory,
    search,
    filterStatus
  ]);

  const totalApplications = allApplications.length;

  const approvedCount = allApplications.filter(
    (item)=>item.status === "Approved"
  ).length;

  const processingCount = allApplications.filter(
    (item)=>item.status === "Processing"
  ).length;

  const rejectedCount = allApplications.filter(
    (item)=>item.status === "Rejected"
  ).length;

  const pendingCount = allApplications.filter(
    (item)=>item.status === "Pending"
  ).length;

  const updateStatus = (category,id,newStatus)=>{

    setVisaData((prev)=>({

      ...prev,

      [category]:prev[category].map((item)=>

        item.id === id

        ? {...item,status:newStatus}

        : item
      )
    }));

    toast.success(`Status Updated to ${newStatus}`);
  };

  const deleteApplication = (category,id)=>{

    const confirmDelete = window.confirm(
      "Delete this application?"
    );

    if(!confirmDelete) return;

    setVisaData((prev)=>({

      ...prev,

      [category]:prev[category].filter(
        (item)=>item.id !== id
      )
    }));

    toast.success("Application Deleted");
  };

  const handleAddApplication = ()=>{

    if(
      !formData.name ||
      !formData.country ||
      !formData.visaType
    ){
      toast.error("Fill all required fields");
      return;
    }

    if(editData){

      setVisaData((prev)=>({

        ...prev,

        [editData.category]:prev[
          editData.category
        ].map((item)=>

          item.id === editData.id

          ? {
              ...item,
              ...formData
            }

          : item
        )
      }));

      toast.success("Application Updated");

    }else{

      const newApplication = {

        id:`APP${Math.floor(Math.random()*10000)}`,

        ...formData,

        status:"Pending",

        priority:false
      };

      const targetCategory =
      activeCategory === "All"
      ? "Individuals"
      : activeCategory;

      setVisaData((prev)=>({

        ...prev,

        [targetCategory]:[
          newApplication,
          ...prev[targetCategory]
        ]
      }));

      toast.success("Application Added");
    }

    setFormData({
      name:"",
      country:"",
      visaType:"",
      passport:"",
      email:"",
      phone:"",
      travelDate:""
    });

    setEditData(null);

    setShowAddForm(false);
  };

  const downloadApplication = (item)=>{

    const data = `

Application ID: ${item.id}

Applicant: ${item.name}

Category: ${item.category}

Country: ${item.country}

Visa Type: ${item.visaType}

Status: ${item.status}

Passport: ${item.passport}

Email: ${item.email}

Phone: ${item.phone}

Travel Date: ${item.travelDate}
`;

    const blob = new Blob([data],{
      type:"text/plain"
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;

    link.download = `${item.name}.txt`;

    link.click();

    toast.success("Downloaded");
  };

  const getStatusColor = (status)=>{

    switch(status){

      case "Approved":
        return "bg-green-500/20 text-green-400";

      case "Rejected":
        return "bg-red-500/20 text-red-400";

      case "Processing":
        return "bg-yellow-400/20 text-yellow-300";

      default:
        return "bg-blue-500/20 text-blue-400";
    }
  };

  return (

    <div className="min-h-screen bg-gray-50 flex overflow-hidden">

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

              className="w-[300px] h-full bg-white border-r border-gray-100 p-8"
            >

              <div className="flex items-center justify-between">

                <h2 className="text-3xl font-bold text-gray-900">

                  MENU

                </h2>

                <button

                  onClick={()=>setMobileMenu(false)}

                  className="text-gray-900 text-3xl"
                >

                  <FaTimes />

                </button>

              </div>

              <div className="space-y-5 mt-16">

                {
                  ["All","Individuals","Corporate","Agents"].map((item)=>(

                    <button

                      key={item}

                      onClick={()=>{
                        setActiveCategory(item);
                        setMobileMenu(false);
                      }}

                      className="w-full bg-white/10 hover:bg-blue-600 duration-300 text-gray-900 py-4 rounded-2xl font-semibold"
                    >

                      {item}

                    </button>
                  ))
                }

              </div>

            </motion.div>

          </motion.div>
        )}

      </AnimatePresence>

      {/* SIDEBAR */}

      <aside className="w-[300px] hidden lg:flex flex-col justify-between bg-white border-r border-gray-100 p-8">

        <div>

          <h1 className="text-4xl font-bold text-gray-900">

            <span className="text-blue-600">

              HASSLE

            </span>

            <span className="text-yellow-400">

              FREE

            </span>

          </h1>
          
            <div className="flex items-center gap-4 bg-white border border-gray-100 rounded-2xl px-5 py-3">

              <FaUserCircle className="text-4xl text-blue-400" />

              <div>

                <h3 className="text-gray-900 font-semibold">

                  Admin

                </h3>

                <p className="text-gray-500 text-sm">

                  Super Admin

                </p>

              </div>
            </div>

          <div className="space-y-5 mt-16">

            {
              ["All","Individuals","Corporate","Agents"].map((item)=>(

                <button

                  key={item}

                  onClick={()=>setActiveCategory(item)}

                  className={`w-full py-4 rounded-2xl font-semibold flex items-center justify-center gap-3 duration-300

                  ${
                    activeCategory === item

                    ? "bg-blue-600 text-gray-900"

                    : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                  }
                  `}
                >

                  {
                    item === "Individuals"

                    ? <FaPassport />

                    : item === "Corporate"

                    ? <FaBuilding />

                    : item === "Agents"

                    ? <FaUserTie />

                    : <FaUsers />
                  }

                  {item}

                </button>
              ))
            }

          </div>

        </div>

        

      </aside>

      {/* MAIN */}

      <main className="flex-1 p-6 lg:p-12 overflow-y-auto">

        {/* TOP */}

        <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-6">

          <div className="flex items-center justify-between">

            <div>

              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900">

                Visa Control Center

              </h2>

              <p className="text-gray-500 mt-4 text-lg">

                Manage all applicants and visa applications.

              </p>

            </div>

            <button

              onClick={()=>setMobileMenu(true)}

              className="lg:hidden w-14 h-14 rounded-2xl bg-white/10 text-gray-900 flex items-center justify-center text-2xl"
            >

              <FaBars />

            </button>

          </div>

          {/* PROFILE + ACTIONS */}

          <div className="flex items-center gap-4 flex-wrap">

            <button

              onClick={()=>setShowAddForm(true)}

              className="bg-blue-600 hover:scale-105 duration-300 text-white px-8 py-4 rounded-2xl font-semibold flex items-center gap-3"
            >

              <FaPlus />

              Add Application

            </button>

            <button

              onClick={()=>setShowNotifications(!showNotifications)}

              className="relative w-14 h-14 rounded-full bg-white/10 flex items-center justify-center text-gray-900 text-xl"
            >

              <FaBell />

              <span className="absolute -top-1 -right-1 bg-red-500 text-xs w-6 h-6 rounded-full flex items-center justify-center">

                {notifications.length}

              </span>

            </button>


            <button

              onClick={()=>{
                toast.success("Signed Out");
              }}

              className="bg-red-500 hover:bg-red-600 duration-300 text-white px-6 py-4 rounded-2xl font-semibold flex items-center gap-3"
            >

              <FaSignOutAlt />

              Sign Out

            </button>

          </div>

        </div>

        {/* NOTIFICATIONS */}

        <AnimatePresence>

          {
            showNotifications && (

              <motion.div

                initial={{
                  opacity:0,
                  y:-20
                }}

                animate={{
                  opacity:1,
                  y:0
                }}

                exit={{
                  opacity:0,
                  y:-20
                }}

                className="bg-white border border-gray-100 rounded-[30px] p-8 mt-8"
              >

                <div className="flex items-center gap-4 mb-6">

                  <FaBell className="text-yellow-400 text-2xl" />

                  <h2 className="text-2xl font-bold text-gray-900">

                    Notifications

                  </h2>

                </div>

                <div className="space-y-4">

                  {
                    notifications.map((item,index)=>(

                      <div

                        key={index}

                        className="bg-white border border-gray-100 rounded-2xl px-5 py-4 text-gray-300"
                      >

                        {item}

                      </div>
                    ))
                  }

                </div>

              </motion.div>
            )
          }

        </AnimatePresence>

        {/* ANALYTICS */}

        <div className="grid md:grid-cols-2 xl:grid-cols-5 gap-8 mt-14">

          <motion.div whileHover={{y:-10}} className="bg-gradient-to-br from-blue-600 to-blue-400 rounded-[35px] p-8 text-gray-900">

            <div className="flex items-center justify-between">

              <div>

                <p>Total</p>

                <h2 className="text-5xl font-bold mt-4">

                  {totalApplications}

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

                  {processingCount}

                </h2>

              </div>

              <FaClock className="text-5xl" />

            </div>

          </motion.div>

          <motion.div whileHover={{y:-10}} className="bg-gradient-to-br from-green-500 to-emerald-400 rounded-[35px] p-8 text-gray-900">

            <div className="flex items-center justify-between">

              <div>

                <p>Approved</p>

                <h2 className="text-5xl font-bold mt-4">

                  {approvedCount}

                </h2>

              </div>

              <FaCheckCircle className="text-5xl" />

            </div>

          </motion.div>

          <motion.div whileHover={{y:-10}} className="bg-gradient-to-br from-red-500 to-pink-500 rounded-[35px] p-8 text-gray-900">

            <div className="flex items-center justify-between">

              <div>

                <p>Rejected</p>

                <h2 className="text-5xl font-bold mt-4">

                  {rejectedCount}

                </h2>

              </div>

              <FaExclamationTriangle className="text-5xl" />

            </div>

          </motion.div>

          <motion.div whileHover={{y:-10}} className="bg-gradient-to-br from-cyan-500 to-blue-500 rounded-[35px] p-8 text-gray-900">

            <div className="flex items-center justify-between">

              <div>

                <p>Pending</p>

                <h2 className="text-5xl font-bold mt-4">

                  {pendingCount}

                </h2>

              </div>

              <FaFileAlt className="text-5xl" />

            </div>

          </motion.div>

        </div>

        {/* CHARTS */}

        <AnalyticsCharts />

        {/* FILTERS */}

        <div className="grid lg:grid-cols-3 gap-6 mt-14">

          <div className="relative">

            <FaSearch className="absolute top-1/2 -translate-y-1/2 left-5 text-gray-500" />

            <input

              type="text"

              placeholder="Search applications..."

              value={search}

              onChange={(e)=>setSearch(e.target.value)}

              className="w-full bg-white border border-gray-100 rounded-2xl pl-14 pr-6 py-4 text-gray-900 outline-none"
            />

          </div>

          <select

            value={filterStatus}

            onChange={(e)=>setFilterStatus(e.target.value)}

            className="bg-white border border-gray-100 rounded-2xl px-6 py-4 text-gray-900 outline-none"
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

          <div className="bg-white border border-gray-100 rounded-2xl px-6 py-4 flex items-center gap-3 text-gray-900">

            <FaFilter />

            <span>

              {filteredApplications.length} Applications Found

            </span>

          </div>

        </div>

        {/* TABLE */}

        <div className="bg-white border border-gray-100 rounded-[35px] overflow-hidden mt-16">

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

                    Category

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
                        delay:index * 0.05
                      }}

                      className="border-t border-white/5 hover:bg-white/5 duration-300"
                    >

                      <td className="p-6 text-gray-900">

                        {item.id}

                      </td>

                      <td className="p-6 text-gray-900">

                        {item.name}

                      </td>

                      <td className="p-6 text-cyan-400 font-semibold">

                        {item.category}

                      </td>

                      <td className="p-6 text-gray-900">

                        {item.country}

                      </td>

                      <td className="p-6 text-gray-900">

                        {item.visaType}

                      </td>

                      <td className="p-6">

                        <select

                          value={item.status}

                          onChange={(e)=>

                            updateStatus(
                              item.category,
                              item.id,
                              e.target.value
                            )
                          }

                          className={`rounded-xl px-4 py-2 outline-none border border-white/10 ${getStatusColor(item.status)}`}
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

                          <button

                            onClick={()=>{

                              setEditData(item);

                              setFormData(item);

                              setShowAddForm(true);
                            }}

                            className="w-10 h-10 rounded-full bg-yellow-400/20 text-yellow-400 flex items-center justify-center"
                          >

                            <FaEdit />

                          </button>

                          <button

                            onClick={()=>
                              downloadApplication(item)
                            }

                            className="w-10 h-10 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center"
                          >

                            <FaDownload />

                          </button>

                          <button

                            onClick={()=>
                              deleteApplication(
                                item.category,
                                item.id
                              )
                            }

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
                      colSpan="7"
                      className="text-center py-20 text-gray-500 text-xl"
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

      {/* VIEW DETAILS */}

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

                className="bg-white border border-gray-100 rounded-[40px] p-10 w-full max-w-[700px]"
              >

                <div className="flex items-center justify-between">

                  <h2 className="text-4xl font-bold text-gray-900">

                    Application Details

                  </h2>

                  <button

                    onClick={()=>
                      setSelectedApplication(null)
                    }

                    className="text-gray-900 text-3xl"
                  >

                    ×

                  </button>

                </div>

                <div className="grid md:grid-cols-2 gap-8 mt-12">

                  {
                    Object.entries(selectedApplication).map(([key,value])=>(

                      <div key={key}>

                        <p className="text-gray-500 capitalize">

                          {key}

                        </p>

                        <h3 className="text-gray-900 text-xl font-semibold mt-2 break-all">

                          {value.toString()}

                        </h3>

                      </div>
                    ))
                  }

                </div>

              </motion.div>

            </motion.div>
          )
        }

      </AnimatePresence>

      {/* ADD / EDIT FORM */}

      <AnimatePresence>

        {showAddForm && (

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

              className="bg-white border border-gray-100 rounded-[40px] p-10 w-full max-w-[700px]"
            >

              <div className="flex items-center justify-between">

                <h2 className="text-4xl font-bold text-gray-900">

                  {
                    editData
                    ? "Edit Application"
                    : "Add Application"
                  }

                </h2>

                <button

                  onClick={()=>{
                    setShowAddForm(false);
                    setEditData(null);
                  }}

                  className="text-gray-900 text-3xl"
                >

                  ×

                </button>

              </div>

              <div className="grid md:grid-cols-2 gap-6 mt-10">

                {
                  [
                    "name",
                    "country",
                    "visaType",
                    "passport",
                    "email",
                    "phone",
                    "travelDate"
                  ].map((field)=>(

                    <input

                      key={field}

                      type="text"

                      placeholder={field}

                      value={formData[field]}

                      onChange={(e)=>
                        setFormData({
                          ...formData,
                          [field]:e.target.value
                        })
                      }

                      className="bg-white border border-gray-100 rounded-2xl px-6 py-4 text-gray-900 outline-none"
                    />
                  ))
                }

              </div>

              <button

                onClick={handleAddApplication}

                className="w-full mt-10 bg-blue-600 hover:bg-blue-700 duration-300 text-white py-4 rounded-2xl font-semibold"
              >

                {
                  editData
                  ? "Update Application"
                  : "Add Application"
                }

              </button>

            </motion.div>

          </motion.div>
        )}

      </AnimatePresence>

    </div>
  );
}

export default AdminDashboard;