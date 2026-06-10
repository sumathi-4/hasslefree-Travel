import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import toast from "react-hot-toast";

function TrackVisa() {
  const navigate = useNavigate();
  const location = useLocation();

  const [appId, setAppId] = useState("");
  const [passportNum, setPassportNum] = useState("");
  const [loading, setLoading] = useState(false);
  const [application, setApplication] = useState(null);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    if (!isLoggedIn) {
      navigate("/user-login", { state: { from: location }, replace: true });
    }
  }, [navigate, location]);

  const handleTrack = async (e) => {
    e.preventDefault();
    if (!appId.trim() || !passportNum.trim()) {
      toast.error("Please enter both Application ID and Passport Number");
      return;
    }

    setLoading(true);
    setApplication(null);

    try {
      const res = await axios.get("http://localhost:5000/api/admin/track-visa", {
        params: {
          id: appId.trim(),
          passport: passportNum.trim()
        }
      });

      if (res.data.success) {
        setApplication(res.data.application);
        toast.success("Application details loaded successfully");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "No application matches these credentials");
    } finally {
      setLoading(false);
    }
  };

  // Stepper calculations
  const getStepStatus = (stepIndex) => {
    if (!application) return "inactive";
    const status = application.status;

    // Steps mapping:
    // 1: Applied (always active)
    // 2: Documents Verified (Active if status in Documents Received, Under Review, Approved, Rejected)
    // 3: Under Review (Active if status in Under Review, Approved, Rejected)
    // 4: Approved/Rejected (Active if Approved or Rejected)

    if (stepIndex === 1) return "active";

    if (stepIndex === 2) {
      return ["Documents Received", "Under Review", "Approved", "Rejected"].includes(status)
        ? "active"
        : "inactive";
    }

    if (stepIndex === 3) {
      return ["Under Review", "Approved", "Rejected"].includes(status)
        ? "active"
        : "inactive";
    }

    if (stepIndex === 4) {
      if (status === "Approved") return "approved";
      if (status === "Rejected") return "rejected";
      return "inactive";
    }

    return "inactive";
  };

  const getStatusBadgeStyles = (status) => {
    switch (status) {
      case "Approved":
        return "bg-green-500/20 border-green-500 text-green-400";
      case "Rejected":
        return "bg-red-500/20 border-red-500 text-red-400";
      case "Under Review":
        return "bg-yellow-500/20 border-yellow-500 text-yellow-400";
      case "Documents Received":
        return "bg-blue-500/20 border-blue-500 text-blue-400";
      default:
        return "bg-gray-500/20 border-gray-500 text-gray-400";
    }
  };

  return (
    <>
      <Navbar />

      {/* Hero */}
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=2070&auto=format&fit=crop')",
          }}
        >
          <div className="absolute inset-0 bg-black/70"></div>
        </div>

        <div className="relative z-10 text-center px-6">
          <motion.h1
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-5xl md:text-7xl font-bold text-white"
          >
            Track Your Visa
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
            className="text-gray-300 mt-6 text-lg"
          >
            Check your visa application status instantly.
          </motion.p>
        </div>
      </section>

      {/* Tracking Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          {/* Search Card */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-white rounded-[40px] shadow-xl p-10 border border-gray-100"
          >
            <h2 className="text-4xl font-bold text-gray-900 text-center">
              Visa Application Tracking
            </h2>
            <p className="text-gray-500 mt-4 text-center">
              Enter your application details to track status.
            </p>

            <form onSubmit={handleTrack}>
              {/* Inputs */}
              <div className="grid md:grid-cols-2 gap-6 mt-12">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-gray-600 uppercase">Application ID</label>
                  <input
                    type="text"
                    value={appId}
                    onChange={(e) => setAppId(e.target.value)}
                    placeholder="e.g. IND1024"
                    required
                    className="border border-gray-200 bg-gray-50 rounded-2xl px-6 py-4 outline-none focus:border-blue-600 focus:bg-white transition-all font-semibold"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-gray-600 uppercase">Passport Number</label>
                  <input
                    type="text"
                    value={passportNum}
                    onChange={(e) => setPassportNum(e.target.value)}
                    placeholder="e.g. MZ4567821"
                    required
                    className="border border-gray-200 bg-gray-50 rounded-2xl px-6 py-4 outline-none focus:border-blue-600 focus:bg-white transition-all font-semibold"
                  />
                </div>
              </div>

              {/* Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full mt-8 bg-blue-600 hover:bg-blue-700 duration-300 text-white py-4 rounded-2xl font-semibold text-lg shadow-lg shadow-blue-600/10"
              >
                {loading ? "Tracking Application..." : "Track Application"}
              </button>
            </form>
          </motion.div>

          {/* Dynamic Status Card */}
          <AnimatePresence>
            {application && (
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                transition={{ duration: 0.6 }}
                className="bg-blue-900 rounded-[40px] p-10 mt-16 text-white shadow-2xl border border-blue-800"
              >
                {/* Top Details */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 border-b border-blue-800 pb-8">
                  <div>
                    <h3 className="text-3xl font-bold">
                      Application ID: {application.id}
                    </h3>
                    <p className="text-blue-200 mt-2 font-medium">
                      {application.name} — {application.country} {application.visaType}
                    </p>
                    <p className="text-blue-300 text-sm mt-1">
                      Submitted on: {application.submittedOn} | Last Updated: {application.updatedOn}
                    </p>
                  </div>

                  {/* Status Badge */}
                  <div className={`border px-8 py-3 rounded-full text-lg font-bold uppercase tracking-wider ${getStatusBadgeStyles(application.status)}`}>
                    {application.status}
                  </div>
                </div>

                {/* Timeline Progress */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-12">
                  {/* Step 1: Applied */}
                  <div className="text-center flex flex-col items-center">
                    <div className="w-16 h-16 rounded-full bg-blue-500 text-white flex items-center justify-center font-extrabold text-xl shadow-lg border-4 border-blue-400">
                      1
                    </div>
                    <h4 className="mt-4 text-lg font-bold text-white">
                      Applied
                    </h4>
                    <p className="text-sm text-blue-200 mt-1">Application Submitted</p>
                  </div>

                  {/* Step 2: Documents Received */}
                  <div className="text-center flex flex-col items-center">
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center font-extrabold text-xl shadow-lg border-4 transition-all duration-300 ${
                      getStepStatus(2) === "active"
                        ? "bg-blue-500 text-white border-blue-400"
                        : "bg-blue-950 text-blue-400 border-blue-900"
                    }`}>
                      2
                    </div>
                    <h4 className={`mt-4 text-lg font-bold transition-all duration-300 ${
                      getStepStatus(2) === "active" ? "text-white" : "text-blue-400"
                    }`}>
                      Doc Verified
                    </h4>
                    <p className="text-sm text-blue-300 mt-1">Documents Received</p>
                  </div>

                  {/* Step 3: Under Review */}
                  <div className="text-center flex flex-col items-center">
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center font-extrabold text-xl shadow-lg border-4 transition-all duration-300 ${
                      getStepStatus(3) === "active"
                        ? "bg-blue-500 text-white border-blue-400"
                        : "bg-blue-950 text-blue-400 border-blue-900"
                    }`}>
                      3
                    </div>
                    <h4 className={`mt-4 text-lg font-bold transition-all duration-300 ${
                      getStepStatus(3) === "active" ? "text-white" : "text-blue-400"
                    }`}>
                      Processing
                    </h4>
                    <p className="text-sm text-blue-300 mt-1">Embassy Verification</p>
                  </div>

                  {/* Step 4: Approved/Rejected */}
                  <div className="text-center flex flex-col items-center">
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center font-extrabold text-xl shadow-lg border-4 transition-all duration-300 ${
                      getStepStatus(4) === "approved"
                        ? "bg-green-500 text-white border-green-400"
                        : getStepStatus(4) === "rejected"
                        ? "bg-red-500 text-white border-red-400"
                        : "bg-blue-950 text-blue-400 border-blue-900"
                    }`}>
                      4
                    </div>
                    <h4 className={`mt-4 text-lg font-bold transition-all duration-300 ${
                      getStepStatus(4) !== "inactive"
                        ? "text-white"
                        : "text-blue-400"
                    }`}>
                      {application.status === "Rejected" ? "Rejected" : "Approved"}
                    </h4>
                    <p className="text-sm text-blue-300 mt-1">Final Decision</p>
                  </div>
                </div>

                {/* Remarks/Pending Reason */}
                {application.pendingReason && application.pendingReason !== "None" && (
                  <div className="mt-10 bg-blue-950/50 rounded-2xl p-5 border border-blue-800 text-center md:text-left">
                    <span className="font-bold text-red-400 uppercase text-xs tracking-wider block mb-1">Remarks / Action Required</span>
                    <p className="text-gray-200 italic font-medium">{application.pendingReason}</p>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default TrackVisa;