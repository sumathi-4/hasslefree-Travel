import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
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
  FaBuilding,
  FaUserTie,
  FaUserCircle,
  FaFilter,
  FaGlobe,
  FaFileAlt,
  FaCog,
  FaChartBar,
  FaCheck,
  FaChevronRight,
  FaPlane,
  FaSpinner
} from "react-icons/fa";

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [countryFilter, setCountryFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [editData, setEditData] = useState(null);
  const [trackingSearch, setTrackingSearch] = useState("");
  const [trackedApp, setTrackedApp] = useState(null);

  // New features state
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showApprovedStamp, setShowApprovedStamp] = useState(false);
  const [isTabLoading, setIsTabLoading] = useState(false);
  
  // Mock Users data
  const [usersData, setUsersData] = useState([
    { id: 1, name: "Rahul Sharma", email: "rahul@example.com", role: "Client", phone: "+91 98765 43210", status: "Active" },
    { id: 2, name: "Amit Kumar", email: "amit@example.com", role: "Corporate", phone: "+91 91234 56789", status: "Active" },
    { id: 3, name: "Priya Mehta", email: "priya@example.com", role: "Agent", phone: "+91 99887 76655", status: "Active" },
    { id: 4, name: "Sneha Patel", email: "sneha@example.com", role: "Client", phone: "+91 98711 22334", status: "Inactive" },
    { id: 5, name: "Vikram Singh", email: "vikram@example.com", role: "Corporate", phone: "+91 90000 11122", status: "Active" }
  ]);

  // Settings & Profile state
  const [adminProfile, setAdminProfile] = useState(() => {
    const email = localStorage.getItem("adminEmail") || "admin@hasslefree.com";
    const name = localStorage.getItem("adminName") || (email ? email.split("@")[0] : "Admin User");
    const role = localStorage.getItem("adminRole") || "Super Admin";
    const lastLogin = localStorage.getItem("adminLastLogin") || "Today, 10:30 AM";
    const ipAddress = localStorage.getItem("adminIpAddress") || "103.21.45.67";
    const systemStatus = localStorage.getItem("adminSystemStatus") || "System Active";
    return { name, email, role, lastLogin, ipAddress, systemStatus };
  });

  const [settingsData, setSettingsData] = useState(() => {
    const saved = localStorage.getItem("adminSettings");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return {
          ...parsed,
          companyLogo: localStorage.getItem("adminCompanyLogo") || parsed.companyLogo || "🌐",
          adminName: localStorage.getItem("adminName") || parsed.adminName || "Admin User",
          adminEmail: localStorage.getItem("adminEmail") || parsed.adminEmail || "admin@hasslefree.com",
          adminRole: localStorage.getItem("adminRole") || parsed.adminRole || "Super Admin",
          adminLastLogin: localStorage.getItem("adminLastLogin") || parsed.adminLastLogin || "Today, 10:30 AM",
          adminIpAddress: localStorage.getItem("adminIpAddress") || parsed.adminIpAddress || "103.21.45.67",
          adminSystemStatus: localStorage.getItem("adminSystemStatus") || parsed.adminSystemStatus || "System Active"
        };
      } catch (e) {}
    }
    return {
      companyName: "HassleFree Travel",
      supportEmail: "support@hasslefree.com",
      supportPhone: "+91 98765 43210",
      defaultVisaStatus: "Under Review",
      timezone: "(GMT+05:30) Asia/Kolkata",
      emailNotifications: true,
      statusChangeAlerts: true,
      newApplicationAlerts: true,
      documentUploadAlerts: false,
      themeMode: "Light",
      companyLogo: localStorage.getItem("adminCompanyLogo") || "🌐",
      adminName: localStorage.getItem("adminName") || "Admin User",
      adminEmail: localStorage.getItem("adminEmail") || "admin@hasslefree.com",
      adminRole: localStorage.getItem("adminRole") || "Super Admin",
      adminLastLogin: localStorage.getItem("adminLastLogin") || "Today, 10:30 AM",
      adminIpAddress: localStorage.getItem("adminIpAddress") || "103.21.45.67",
      adminSystemStatus: localStorage.getItem("adminSystemStatus") || "System Active"
    };
  });

  const handleSaveSettings = () => {
    localStorage.setItem("adminSettings", JSON.stringify(settingsData));
    localStorage.setItem("adminName", settingsData.adminName);
    localStorage.setItem("adminEmail", settingsData.adminEmail);
    localStorage.setItem("adminRole", settingsData.adminRole);
    localStorage.setItem("adminLastLogin", settingsData.adminLastLogin);
    localStorage.setItem("adminIpAddress", settingsData.adminIpAddress);
    localStorage.setItem("adminSystemStatus", settingsData.adminSystemStatus);
    localStorage.setItem("adminCompanyLogo", settingsData.companyLogo || "🌐");
    setAdminProfile({
      name: settingsData.adminName,
      email: settingsData.adminEmail,
      role: settingsData.adminRole,
      lastLogin: settingsData.adminLastLogin,
      ipAddress: settingsData.adminIpAddress,
      systemStatus: settingsData.adminSystemStatus
    });
    toast.success("Settings saved successfully!");
  };

  const handleTabChange = (tabId) => {
    if (activeTab === tabId) return;
    setIsTabLoading(true);
    setTimeout(() => {
      setActiveTab(tabId);
      setIsTabLoading(false);
    }, 600); // Wait for airplane loader
  };

  // Individual section states
  const [indSubTab, setIndSubTab] = useState("All");
  const [indSearch, setIndSearch] = useState("");
  const [indCountry, setIndCountry] = useState("All");

  // Corporate section states
  const [corpSubTab, setCorpSubTab] = useState("All");
  const [corpSearch, setCorpSearch] = useState("");
  const [corpCountry, setCorpCountry] = useState("All");

  // Agent section states
  const [agentSubTab, setAgentSubTab] = useState("All");
  const [agentSearch, setAgentSearch] = useState("");
  const [agentCountry, setAgentCountry] = useState("All");

  // Documents section states
  const [docSubTab, setDocSubTab] = useState("All");
  const [docSearch, setDocSearch] = useState("");
  const [docCountry, setDocCountry] = useState("All");

  // Pending section states
  const [pendingSubTab, setPendingSubTab] = useState("All");
  const [pendingSearch, setPendingSearch] = useState("");
  const [pendingCountry, setPendingCountry] = useState("All");

  // Live ticking clock state
  const [currentTime, setCurrentTime] = useState(new Date());
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const fetchApplications = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/admin/applications");
      if (response.data.success) {
        const apps = response.data.applications;
        const grouped = {
          Individuals: apps.filter((a) => a.category === "Individuals"),
          Corporate: apps.filter((a) => a.category === "Corporate"),
          Agents: apps.filter((a) => a.category === "Agents")
        };
        setVisaData(grouped);
      }
    } catch (error) {
      console.error("Failed to fetch applications:", error);
      toast.error("Failed to load applications from MongoDB");
    }
  };

  const getStatusDotColor = (status) => {
    if (!status) return "bg-green-500";
    const s = status.toLowerCase();
    if (s.includes("active")) return "bg-green-500 animate-pulse";
    if (s.includes("maintenance")) return "bg-amber-500 animate-pulse";
    return "bg-gray-400";
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  // Country Flags Helper
  const getCountryFlag = (country) => {
    if (!country) return "";
    const flags = {
      usa: "🇺🇸",
      uk: "🇬🇧",
      canada: "🇨🇦",
      australia: "🇦🇺",
      singapore: "🇸🇬",
      germany: "🇩🇪",
      dubai: "🇦🇪",
      uae: "🇦🇪",
      thailand: "🇹🇭",
      malaysia: "🇲🇾",
      oman: "🇴🇲",
      spain: "🇪🇸",
      france: "🇫🇷",
      italy: "🇮🇹",
      japan: "🇯🇵",
      india: "🇮🇳"
    };
    return flags[country.toLowerCase().trim()] || "🏳️";
  };

  const [formData, setFormData] = useState({
    name: "",
    country: "",
    visaType: "",
    passport: "",
    email: "",
    phone: "",
    travelDate: "",
    companyName: "",
    contactPerson: "",
    agentName: "",
    agencyName: "",
    docType: "",
    pendingReason: "",
    status: "Pending"
  });

  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  useEffect(() => {
    if (showAddForm && !editData) {
      setFormData(prev => ({
        ...prev,
        status: settingsData.defaultVisaStatus || "Pending"
      }));
    }
  }, [showAddForm, editData, settingsData.defaultVisaStatus]);

  // Rich mock data to represent what's in the image dashboard
  const [visaData, setVisaData] = useState({
    Individuals: [
      {
        id: "IND1024",
        name: "Arjun Kumar",
        country: "Canada",
        status: "Pending",
        visaType: "Tourist Visa",
        passport: "MZ4567821",
        email: "arjun@gmail.com",
        phone: "+91 9876543210",
        travelDate: "12 Aug 2026",
        submittedOn: "28 May 2026",
        docType: "Passport & Bank Statement",
        receivedOn: "28 May 2026",
        verifiedBy: "Admin User",
        pendingReason: "Awaiting Bank Statement Verification",
        updatedOn: "29 May 2026",
        priority: true
      },
      {
        id: "IND1025",
        name: "Priya Sharma",
        country: "USA",
        status: "Under Review",
        visaType: "Business Visa",
        passport: "AX892114",
        email: "priya@gmail.com",
        phone: "+91 9988776655",
        travelDate: "20 Sep 2026",
        submittedOn: "27 May 2026",
        docType: "Business Invitation",
        receivedOn: "27 May 2026",
        verifiedBy: "Agent Manager",
        pendingReason: "Pending Embassy Response",
        updatedOn: "27 May 2026",
        priority: false
      },
      {
        id: "IND1026",
        name: "Skyline Travels Ltd",
        country: "Dubai",
        status: "Approved",
        visaType: "Visit Visa",
        passport: "TR881122",
        email: "skyline@travels.com",
        phone: "+971 667788",
        travelDate: "05 Jul 2026",
        submittedOn: "26 May 2026",
        docType: "Hotel Booking",
        receivedOn: "26 May 2026",
        verifiedBy: "Admin User",
        pendingReason: "None",
        updatedOn: "28 May 2026",
        priority: false
      },
      {
        id: "IND1027",
        name: "Rahul Verma",
        country: "Australia",
        status: "Documents Received",
        visaType: "Student Visa",
        passport: "AU992211",
        email: "rahul@gmail.com",
        phone: "+91 7766554433",
        travelDate: "15 Jun 2026",
        submittedOn: "25 May 2026",
        docType: "Admission Letter & Passport",
        receivedOn: "25 May 2026",
        verifiedBy: "Admin User",
        pendingReason: "Awaiting Document Review",
        updatedOn: "26 May 2026",
        priority: true
      },
      {
        id: "IND1028",
        name: "Elena Rostova",
        country: "UK",
        status: "Rejected",
        visaType: "Work Visa",
        passport: "RU882299",
        email: "elena@gmail.com",
        phone: "+7 900 123 4567",
        travelDate: "10 Jul 2026",
        submittedOn: "24 May 2026",
        docType: "Sponsorship Offer",
        receivedOn: "24 May 2026",
        verifiedBy: "Super Admin",
        pendingReason: "Invalid Sponsorship Document",
        updatedOn: "25 May 2026",
        priority: false
      }
    ],
    Corporate: [
      {
        id: "COR5021",
        name: "Infosys Pvt Ltd",
        companyName: "Infosys Pvt Ltd",
        contactPerson: "Rohan Mehta",
        country: "USA",
        status: "Under Review",
        visaType: "Business Visa",
        passport: "BZ661122",
        email: "hr@infosys.com",
        phone: "+91 8888888888",
        travelDate: "10 Oct 2026",
        submittedOn: "24 May 2026",
        docType: "Company Registration & Invitation",
        receivedOn: "24 May 2026",
        verifiedBy: "Admin User",
        pendingReason: "None",
        updatedOn: "25 May 2026",
        priority: true
      },
      {
        id: "COR5022",
        name: "Tech Solutions LLC",
        companyName: "Tech Solutions LLC",
        contactPerson: "Sarah Connor",
        country: "UK",
        status: "Approved",
        visaType: "Work Visa",
        passport: "US889922",
        email: "sarah.c@techsol.com",
        phone: "+1 555 0199",
        travelDate: "01 Aug 2026",
        submittedOn: "23 May 2026",
        docType: "Sponsorship Certificate",
        receivedOn: "23 May 2026",
        verifiedBy: "Super Admin",
        pendingReason: "None",
        updatedOn: "27 May 2026",
        priority: true
      },
      {
        id: "COR5023",
        name: "Global Enterprises",
        companyName: "Global Enterprises",
        contactPerson: "David Lim",
        country: "Singapore",
        status: "Pending",
        visaType: "Business Visa",
        passport: "SG112233",
        email: "david@globalent.sg",
        phone: "+65 6789 0123",
        travelDate: "18 Jun 2026",
        submittedOn: "22 May 2026",
        docType: "Trade License & Tax returns",
        receivedOn: "22 May 2026",
        verifiedBy: "Admin User",
        pendingReason: "Tax Return Copies Missing",
        updatedOn: "28 May 2026",
        priority: false
      }
    ],
    Agents: [
      {
        id: "AG8812",
        name: "Skyline Travels",
        agentName: "Aman Gupta",
        agencyName: "Skyline Travels Agency",
        country: "Dubai",
        status: "Approved",
        visaType: "Tourist Visa",
        passport: "TR881122",
        email: "skyline@gmail.com",
        phone: "+971 667788",
        travelDate: "5 Dec 2026",
        submittedOn: "21 May 2026",
        docType: "Flight Tickets & Hotel",
        receivedOn: "21 May 2026",
        verifiedBy: "Agent Manager",
        pendingReason: "None",
        updatedOn: "22 May 2026",
        priority: true
      },
      {
        id: "AG8813",
        name: "Bright Future Ltd",
        agentName: "John Smith",
        agencyName: "Bright Future Travel Agency",
        country: "Canada",
        status: "Rejected",
        visaType: "Student Visa",
        passport: "CA556611",
        email: "bright@futuretravel.com",
        phone: "+1 604 555 0123",
        travelDate: "01 Sep 2026",
        submittedOn: "20 May 2026",
        docType: "IELTS Certificate & LOA",
        receivedOn: "20 May 2026",
        verifiedBy: "Super Admin",
        pendingReason: "Invalid IELTS Verification Code",
        updatedOn: "24 May 2026",
        priority: false
      },
      {
        id: "AG8814",
        name: "Holiday Planners",
        agentName: "Fritz Mueller",
        agencyName: "Holiday Planners Int",
        country: "Germany",
        status: "Pending",
        visaType: "Tourist Visa",
        passport: "DE998877",
        email: "info@holidayplanners.de",
        phone: "+49 30 123456",
        travelDate: "28 Jun 2026",
        submittedOn: "19 May 2026",
        docType: "ITR & Bank Details",
        receivedOn: "19 May 2026",
        verifiedBy: "System",
        pendingReason: "Awaiting Financial Check",
        updatedOn: "19 May 2026",
        priority: false
      }
    ]
  });

  // Helper to map and merge all categories of applications
  const allApplications = useMemo(() => {
    return [
      ...visaData.Individuals.map((item) => ({ ...item, category: "Individuals" })),
      ...visaData.Corporate.map((item) => ({ ...item, category: "Corporate" })),
      ...visaData.Agents.map((item) => ({ ...item, category: "Agents" }))
    ];
  }, [visaData]);

  const [notificationsList, setNotificationsList] = useState([]);

  useEffect(() => {
    if (allApplications && allApplications.length > 0 && notificationsList.length === 0) {
      setNotificationsList(
        allApplications.slice(0, 5).map((app, idx) => ({
          id: `notif-${idx}-${app.id}`,
          message: `${app.category.slice(0, -1)} Application ${app.id} updated to ${app.status} for ${app.name}`,
          time: "Just now",
          appId: app.id,
          category: app.category
        }))
      );
    }
  }, [allApplications]);

  // Combined search & filter logic
  const filteredApplications = useMemo(() => {
    return allApplications.filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.visaType.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        categoryFilter === "All" ? true : item.category === categoryFilter;

      const matchesCountry =
        countryFilter === "All" ? true : item.country === countryFilter;

      const matchesStatus =
        statusFilter === "All" ? true : item.status === statusFilter;

      return matchesSearch && matchesCategory && matchesCountry && matchesStatus;
    });
  }, [allApplications, searchQuery, categoryFilter, countryFilter, statusFilter]);

  // Unique list of countries for filter dropdown
  const uniqueCountries = useMemo(() => {
    const countries = allApplications.map(a => a.country);
    return ["All", ...new Set(countries)];
  }, [allApplications]);

  const getIndividualCounts = useMemo(() => {
    const list = visaData.Individuals;
    const pending = list.filter(a => a.status === "Pending").length;
    const docRec = list.filter(a => a.status === "Documents Received").length;
    const underReview = list.filter(a => a.status === "Under Review").length;
    const approved = list.filter(a => a.status === "Approved").length;
    const rejected = list.filter(a => a.status === "Rejected").length;
    return {
      all: list.length,
      pending: pending,
      docReceived: docRec,
      underReview: underReview,
      approved: approved,
      rejected: rejected
    };
  }, [visaData.Individuals]);

  const getCorporateCounts = useMemo(() => {
    const list = visaData.Corporate;
    const pending = list.filter(a => a.status === "Pending").length;
    const docRec = list.filter(a => a.status === "Documents Received").length;
    const underReview = list.filter(a => a.status === "Under Review").length;
    const approved = list.filter(a => a.status === "Approved").length;
    const rejected = list.filter(a => a.status === "Rejected").length;
    return {
      all: list.length,
      pending: pending,
      docReceived: docRec,
      underReview: underReview,
      approved: approved,
      rejected: rejected
    };
  }, [visaData.Corporate]);

  const getAgentCounts = useMemo(() => {
    const list = visaData.Agents;
    const pending = list.filter(a => a.status === "Pending").length;
    const docRec = list.filter(a => a.status === "Documents Received").length;
    const underReview = list.filter(a => a.status === "Under Review").length;
    const approved = list.filter(a => a.status === "Approved").length;
    const rejected = list.filter(a => a.status === "Rejected").length;
    return {
      all: list.length,
      pending: pending,
      docReceived: docRec,
      underReview: underReview,
      approved: approved,
      rejected: rejected
    };
  }, [visaData.Agents]);

  const getDocumentCounts = useMemo(() => {
    const ind = visaData.Individuals.filter(a => a.docType).length;
    const corp = visaData.Corporate.filter(a => a.docType).length;
    const agt = visaData.Agents.filter(a => a.docType).length;
    return {
      all: ind + corp + agt,
      individual: ind,
      corporate: corp,
      agents: agt
    };
  }, [visaData]);

  const getPendingSectionCounts = useMemo(() => {
    const list = allApplications.filter(a => a.status === "Pending");
    const missingDocs = list.filter(a => a.pendingReason?.toLowerCase().includes("document") || a.pendingReason?.toLowerCase().includes("missing")).length;
    const embassyReview = list.filter(a => a.pendingReason?.toLowerCase().includes("embassy")).length;
    const others = list.length - missingDocs - embassyReview;
    return {
      all: list.length,
      missingDocs: missingDocs,
      embassyReview: embassyReview,
      others: others > 0 ? others : 0
    };
  }, [allApplications]);

  const dashboardStats = useMemo(() => {
    const totalApps = getIndividualCounts.all + getCorporateCounts.all + getAgentCounts.all;
    const approvedApps = getIndividualCounts.approved + getCorporateCounts.approved + getAgentCounts.approved;
    const pendingApps = getIndividualCounts.pending + getCorporateCounts.pending + getAgentCounts.pending;
    const rejectedApps = getIndividualCounts.rejected + getCorporateCounts.rejected + getAgentCounts.rejected;
    const docReceived = getIndividualCounts.docReceived + getCorporateCounts.docReceived + getAgentCounts.docReceived;
    const underReview = getIndividualCounts.underReview + getCorporateCounts.underReview + getAgentCounts.underReview;

    return {
      totalApplications: totalApps.toLocaleString(),
      totalApplicationsChange: "▲ 18.5% from last month",
      approved: approvedApps.toLocaleString(),
      approvedChange: "▲ 24.0% from last month",
      pending: pendingApps.toLocaleString(),
      pendingChange: "▼ 4.3% from last month",
      rejected: rejectedApps.toLocaleString(),
      rejectedChange: "▲ 8.7% from last month",
      docReceived: docReceived.toLocaleString(),
      underReview: underReview.toLocaleString(),
      individual: getIndividualCounts.all.toLocaleString(),
      corporate: getCorporateCounts.all.toLocaleString(),
      agents: getAgentCounts.all.toLocaleString()
    };
  }, [getIndividualCounts, getCorporateCounts, getAgentCounts]);

  const updateStatus = async (category, id, newStatus) => {
    let targetCategory = category;
    if (!targetCategory) {
      const foundApp = allApplications.find((a) => a.id === id);
      if (foundApp) {
        targetCategory = foundApp.category;
      }
    }

    if (!targetCategory) {
      toast.error("Application category not found");
      return;
    }

    const application = visaData[targetCategory]?.find((item) => item.id === id);
    if (!application) {
      toast.error("Application not found");
      return;
    }

    try {
      const updatedApp = { ...application, status: newStatus, category: targetCategory };
      const res = await axios.put(`http://localhost:5000/api/admin/applications/${id}`, updatedApp);
      
      if (res.data.success) {
        if (newStatus === "Approved") {
          setShowApprovedStamp(true);
          setTimeout(() => setShowApprovedStamp(false), 2000);
        }
        toast.success(`Status updated to ${newStatus}`);
        
        // Dynamic notification update
        const newNotif = {
          id: `notif-dyn-${Date.now()}`,
          message: `${targetCategory.slice(0, -1)} Application ${id} updated to ${newStatus} for ${application.name}`,
          time: "Just now",
          appId: id,
          category: targetCategory
        };
        setNotificationsList(prev => [newNotif, ...prev]);

        fetchApplications();
      }
    } catch (error) {
      console.error("Failed to update status:", error);
      toast.error("Failed to update status on server");
    }
  };

  const deleteApplication = async (category, id) => {
    if (!window.confirm("Are you sure you want to delete this application?")) return;
    try {
      const res = await axios.delete(`http://localhost:5000/api/admin/applications/${id}`);
      if (res.data.success) {
        toast.success("Application Deleted");
        fetchApplications();
      }
    } catch (error) {
      console.error("Failed to delete application:", error);
      toast.error("Failed to delete application from server");
    }
  };

  const handleAddApplication = async () => {
    if (!formData.name?.trim()) {
      toast.error("Applicant Name is required");
      return;
    }
    if (!formData.passport?.trim()) {
      toast.error("Passport No is required");
      return;
    }
    if (!formData.country?.trim()) {
      toast.error("Target Country is required");
      return;
    }
    if (!formData.visaType?.trim()) {
      toast.error("Visa Type is required");
      return;
    }
    if (!formData.email?.trim()) {
      toast.error("Email is required");
      return;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      toast.error("Please enter a valid email address");
      return;
    }

    if (!formData.status) {
      toast.error("Application Status is required");
      return;
    }

    const targetCategory = editData ? editData.category : (categoryFilter === "All" ? "Individuals" : categoryFilter);

    const dataToSend = {
      ...formData,
      category: targetCategory,
      status: formData.status
    };

    try {
      if (editData) {
        const res = await axios.put(`http://localhost:5000/api/admin/applications/${editData.id}`, dataToSend);
        if (res.data.success) {
          toast.success("Application Updated");
          fetchApplications();
        }
      } else {
        const res = await axios.post("http://localhost:5000/api/admin/applications", dataToSend);
        if (res.data.success) {
          toast.success("Application Added Successfully");
          fetchApplications();
        }
      }

      setFormData({
        name: "",
        country: "",
        visaType: "",
        passport: "",
        email: "",
        phone: "",
        travelDate: "",
        companyName: "",
        contactPerson: "",
        agentName: "",
        agencyName: "",
        docType: "",
        pendingReason: "",
        status: settingsData.defaultVisaStatus || "Pending"
      });
      setEditData(null);
      setShowAddForm(false);
    } catch (error) {
      console.error("Failed to save application:", error);
      toast.error(error.response?.data?.message || "Failed to save application");
    }
  };

  const downloadApplication = (item) => {
    const dataStr = `
=========================================
HASSLE FREE VISA MANAGEMENT SYSTEM
Application Document
=========================================
ID: ${item.id}
Applicant: ${item.name}
Category: ${item.category}
Country: ${item.country}
Visa Type: ${item.visaType}
Passport: ${item.passport}
Status: ${item.status}
Travel Date: ${item.travelDate}
Submitted On: ${item.submittedOn}
Verified By: ${item.verifiedBy}
Contact Phone: ${item.phone}
Contact Email: ${item.email}
=========================================
`;
    const blob = new Blob([dataStr], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${item.name}_${item.id}.txt`;
    link.click();
    toast.success("Details Downloaded Successfully");
  };

  const handleTrackingSearch = (e) => {
    e.preventDefault();
    if (!trackingSearch) return;
    const app = allApplications.find(
      a => a.id.toLowerCase() === trackingSearch.trim().toLowerCase() ||
           a.passport.toLowerCase() === trackingSearch.trim().toLowerCase()
    );
    if (app) {
      setTrackedApp(app);
      toast.success("Application details loaded");
    } else {
      setTrackedApp(null);
      toast.error("No application found with that Ref No or Passport");
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Approved":
        return "bg-green-50 text-green-600 border-green-100";
      case "Rejected":
        return "bg-red-50 text-red-600 border-red-100";
      case "Under Review":
        return "bg-purple-50 text-purple-600 border-purple-100";
      case "Documents Received":
        return "bg-blue-50 text-blue-600 border-blue-100";
      case "Pending":
      default:
        return "bg-yellow-50 text-yellow-600 border-yellow-100";
    }
  };

  const exportData = (type) => {
    toast.success(`Exported all applications as ${type}`);
  };

  // Sidebar list representing ALL views in the image
  const sidebarItems = [
    { id: "dashboard", label: "Dashboard", icon: FaUsers },
    { id: "all_apps", label: "All", icon: FaFileAlt },
    { id: "individual_apps", label: "Individual ", icon: FaPassport },
    { id: "corporate_apps", label: "Corporate", icon: FaBuilding },
    { id: "agent_apps", label: "Agent", icon: FaUserTie },
    { id: "documents", label: "Documents Received", icon: FaFileAlt },
    { id: "pending", label: "Pending", icon: FaClock },
    { id: "approved", label: "Approved", icon: FaCheckCircle },
    { id: "rejected", label: "Rejected", icon: FaExclamationTriangle },
    { id: "tracking", label: "Visa Tracking", icon: FaGlobe },
    { id: "reports", label: "Reports & Analytics", icon: FaChartBar },
    { id: "clients", label: "Clients / Users", icon: FaUserCircle },
    { id: "settings", label: "Settings", icon: FaCog },
  ];

  // SUB-SECTIONS RENDERING
  const renderDashboard = () => (
    <div>
      {/* Dashboard Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mt-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Dashboard</h2>
          <p className="text-gray-400 text-sm">Welcome admin, here's what's happening today</p>
        </div>
        <div className="flex items-center gap-3 bg-white border border-gray-150 px-4 py-2.5 rounded-2xl shadow-md text-base font-bold text-gray-700">
          <FaClock className="text-blue-600 animate-pulse" />
          <span>Today: {currentTime.toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "short", year: "numeric" })} | {currentTime.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: true })}</span>
        </div>
      </div>

      {/* Summary Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mt-8">
        {/* Total Applications Card (Red Combination) */}
        <motion.div
          whileHover={{ y: -10, scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          transition={{ type: "spring", stiffness: 300, damping: 15 }}
          className="bg-gradient-to-br from-red-600 via-rose-500 to-red-700 rounded-3xl p-6 shadow-lg shadow-red-500/20 flex items-center justify-between cursor-pointer text-white border border-red-500/10"
          onClick={() => handleTabChange("all_apps")}
        >
          <div>
            <span className="text-base font-bold text-red-100 uppercase tracking-wider">Total Applications</span>
            <h3 className="text-4xl lg:text-5xl font-black mt-2 text-white">{dashboardStats.totalApplications}</h3>
            <span className="text-xs lg:text-sm font-extrabold text-red-200 flex items-center gap-1 mt-2">
              {dashboardStats.totalApplicationsChange}
            </span>
          </div>
          <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center text-white border border-white/10 shadow-inner">
            <FaFileAlt className="text-3xl" />
          </div>
        </motion.div>

        {/* Approved Card (Blue Combination) */}
        <motion.div
          whileHover={{ y: -10, scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          transition={{ type: "spring", stiffness: 300, damping: 15 }}
          className="bg-gradient-to-br from-blue-600 via-sky-500 to-indigo-700 rounded-3xl p-6 shadow-lg shadow-blue-500/20 flex items-center justify-between cursor-pointer text-white border border-blue-500/10"
          onClick={() => {
            setStatusFilter("Approved");
            handleTabChange("all_apps");
          }}
        >
          <div>
            <span className="text-base font-bold text-blue-100 uppercase tracking-wider">Approved</span>
            <h3 className="text-4xl lg:text-5xl font-black mt-2 text-white">{dashboardStats.approved}</h3>
            <span className="text-xs lg:text-sm font-extrabold text-blue-200 flex items-center gap-1 mt-2">
              {dashboardStats.approvedChange}
            </span>
          </div>
          <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center text-white border border-white/10 shadow-inner">
            <FaCheckCircle className="text-3xl" />
          </div>
        </motion.div>

        {/* Pending Card (Green Combination) */}
        <motion.div
          whileHover={{ y: -10, scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          transition={{ type: "spring", stiffness: 300, damping: 15 }}
          className="bg-gradient-to-br from-emerald-600 via-green-500 to-teal-700 rounded-3xl p-6 shadow-lg shadow-green-500/20 flex items-center justify-between cursor-pointer text-white border border-emerald-500/10"
          onClick={() => {
            setStatusFilter("Pending");
            handleTabChange("all_apps");
          }}
        >
          <div>
            <span className="text-base font-bold text-emerald-100 uppercase tracking-wider">Pending</span>
            <h3 className="text-4xl lg:text-5xl font-black mt-2 text-white">{dashboardStats.pending}</h3>
            <span className="text-xs lg:text-sm font-extrabold text-emerald-200 flex items-center gap-1 mt-2">
              {dashboardStats.pendingChange}
            </span>
          </div>
          <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center text-white border border-white/10 shadow-inner">
            <FaClock className="text-3xl" />
          </div>
        </motion.div>

        {/* Rejected Card (Yellow Combination) */}
        <motion.div
          whileHover={{ y: -10, scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          transition={{ type: "spring", stiffness: 300, damping: 15 }}
          className="bg-gradient-to-br from-amber-400 via-yellow-400 to-yellow-500 rounded-3xl p-6 shadow-lg shadow-yellow-500/10 flex items-center justify-between cursor-pointer text-slate-900 border border-yellow-300/10"
          onClick={() => {
            setStatusFilter("Rejected");
            handleTabChange("all_apps");
          }}
        >
          <div>
            <span className="text-base font-bold text-amber-950 opacity-80 uppercase tracking-wider">Rejected</span>
            <h3 className="text-4xl lg:text-5xl font-black mt-2 text-slate-950">{dashboardStats.rejected}</h3>
            <span className="text-xs lg:text-sm font-extrabold text-amber-900 flex items-center gap-1 mt-2">
              {dashboardStats.rejectedChange}
            </span>
          </div>
          <div className="w-16 h-16 rounded-full bg-black/10 flex items-center justify-center text-slate-900 border border-black/5 shadow-inner">
            <FaExclamationTriangle className="text-3xl" />
          </div>
        </motion.div>
      </div>

      {/* 5 Row Sub-cards below */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4 mt-6">
        <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-500 text-sm font-black">
            DR
          </div>
          <div>
            <span className="text-xs text-gray-400 font-semibold uppercase">Docs Received</span>
            <p className="text-base font-bold text-gray-950">{dashboardStats.docReceived}</p>
          </div>
        </div>

        <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center text-purple-500 text-sm font-black">
            UR
          </div>
          <div>
            <span className="text-xs text-gray-400 font-semibold uppercase">Under Review</span>
            <p className="text-base font-bold text-gray-950">{dashboardStats.underReview}</p>
          </div>
        </div>

        <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-500 text-sm font-black">
            ID
          </div>
          <div>
            <span className="text-xs text-gray-400 font-semibold uppercase">Individual</span>
            <p className="text-base font-bold text-gray-950">{dashboardStats.individual}</p>
          </div>
        </div>

        <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center text-red-500 text-sm font-black">
            CO
          </div>
          <div>
            <span className="text-xs text-gray-400 font-semibold uppercase">Corporate</span>
            <p className="text-base font-bold text-gray-950">{dashboardStats.corporate}</p>
          </div>
        </div>

        <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-yellow-50 flex items-center justify-center text-yellow-500 text-sm font-black">
            AG
          </div>
          <div>
            <span className="text-xs text-gray-400 font-semibold uppercase">Agents</span>
            <p className="text-base font-bold text-gray-950">{dashboardStats.agents}</p>
          </div>
        </div>
      </div>

      {/* Render upgraded highly interactive charts */}
      <AnalyticsCharts allApplications={allApplications} />

      {/* Recent Applications Section */}
      <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm mt-8">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-bold text-gray-900">Recent Applications</h3>
          <button
            onClick={() => handleTabChange("all_apps")}
            className="text-blue-600 hover:text-blue-700 text-sm font-bold flex items-center gap-1"
          >
            <span>View All</span>
            <FaChevronRight className="text-xs" />
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-100 text-gray-400 text-xs font-bold uppercase">
                <th className="pb-4">Ref No</th>
                <th className="pb-4">Applicant Name</th>
                <th className="pb-4">Category</th>
                <th className="pb-4">Country</th>
                <th className="pb-4">Visa Type</th>
                <th className="pb-4">Status</th>
                <th className="pb-4">Submitted On</th>
                <th className="pb-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {allApplications.slice(0, 5).map((item) => (
                <tr key={item.id} className="text-sm text-gray-700 hover:bg-gray-50/50">
                  <td className="py-4 font-bold text-gray-900">{item.id}</td>
                  <td className="py-4 font-semibold text-gray-950">{item.name}</td>
                  <td className="py-4 text-xs font-semibold">
                    <span className={`px-2.5 py-1 rounded-full ${
                      item.category === "Corporate" ? "bg-red-50 text-red-600" :
                      item.category === "Agents" ? "bg-yellow-50 text-yellow-600" : "bg-blue-50 text-blue-600"
                    }`}>
                      {item.category}
                    </span>
                  </td>
                  <td className="py-4 font-medium"><span className="flex items-center gap-2">{getCountryFlag(item.country)} {item.country}</span></td>
                  <td className="py-4">{item.visaType}</td>
                  <td className="py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(item.status)}`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="py-4 text-gray-500 font-medium">{item.submittedOn}</td>
                  <td className="py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => setSelectedApplication(item)}
                        className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 flex items-center justify-center"
                      >
                        <FaEye size={12} />
                      </button>
                      <button
                        onClick={() => {
                          setEditData(item);
                          setFormData(item);
                          setShowAddForm(true);
                        }}
                        className="w-8 h-8 rounded-full bg-yellow-50 text-yellow-600 hover:bg-yellow-100 flex items-center justify-center"
                      >
                        <FaEdit size={12} />
                      </button>
                      <button
                        onClick={() => deleteApplication(item.category, item.id)}
                        className="w-8 h-8 rounded-full bg-red-50 text-red-600 hover:bg-red-100 flex items-center justify-center"
                      >
                        <FaTrash size={12} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderAllApplications = () => {
    return (
      <div>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mt-6">
          <div>
            <div className="text-xs font-bold text-gray-400 uppercase tracking-wider">Dashboard &gt; All Applications</div>
            <h2 className="text-2xl font-bold text-gray-900 mt-1">All Applications</h2>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => exportData("Excel")}
              className="px-4 py-2 border border-green-200 text-green-600 bg-green-50 hover:bg-green-100 rounded-xl text-sm font-bold flex items-center gap-2"
            >
              <FaDownload size={12} /> Export Excel
            </button>
            <button
              onClick={() => exportData("PDF")}
              className="px-4 py-2 border border-red-200 text-red-600 bg-red-50 hover:bg-red-100 rounded-xl text-sm font-bold flex items-center gap-2"
            >
              <FaDownload size={12} /> Export PDF
            </button>
          </div>
        </div>

        {/* Filters Panel */}
        <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm mt-8 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-4">
          <div className="relative col-span-1 md:col-span-2">
            <FaSearch className="absolute top-1/2 -translate-y-1/2 left-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by applicant name, ref no, passport..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-50 border border-gray-100 rounded-2xl pl-11 pr-4 py-3 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            />
          </div>

          <div>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-4 py-3 text-sm text-gray-700 outline-none"
            >
              <option value="All">All Categories</option>
              <option value="Individuals">Individuals</option>
              <option value="Corporate">Corporate</option>
              <option value="Agents">Agents</option>
            </select>
          </div>

          <div>
            <select
              value={countryFilter}
              onChange={(e) => setCountryFilter(e.target.value)}
              className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-4 py-3 text-sm text-gray-700 outline-none"
            >
              {uniqueCountries.map(c => (
                <option key={c} value={c}>{c === "All" ? "All Countries" : c}</option>
              ))}
            </select>
          </div>

          <div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-4 py-3 text-sm text-gray-700 outline-none"
            >
              <option value="All">All Statuses</option>
              <option value="Pending">Pending</option>
              <option value="Documents Received">Documents Received</option>
              <option value="Under Review">Under Review</option>
              <option value="Approved">Approved</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>
        </div>

        {/* Applications table view */}
        <div className="bg-white border border-gray-100 rounded-3xl shadow-sm mt-6 overflow-hidden">
          <div className="flex border-b border-gray-100 overflow-x-auto">
            {["All", "Pending", "Documents Received", "Under Review", "Approved", "Rejected"].map((subTab) => (
              <button
                key={subTab}
                onClick={() => setStatusFilter(subTab === "All" ? "All" : subTab)}
                className={`px-6 py-4 text-sm font-semibold border-b-2 whitespace-nowrap transition-all duration-200 ${
                  (subTab === "All" && statusFilter === "All") || (statusFilter === subTab)
                    ? "border-blue-600 text-blue-600 bg-blue-50/20"
                    : "border-transparent text-gray-400 hover:text-gray-600"
                }`}
              >
                {subTab} ({
                  subTab === "All"
                    ? allApplications.length
                    : allApplications.filter(a => a.status === subTab).length
                })
              </button>
            ))}
          </div>

          <div className="overflow-x-auto p-6">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-100 text-gray-400 text-xs font-bold uppercase">
                  <th className="pb-4">Ref No</th>
                  <th className="pb-4">Applicant</th>
                  <th className="pb-4">Category</th>
                  <th className="pb-4">Country</th>
                  <th className="pb-4">Visa Type</th>
                  <th className="pb-4">Status</th>
                  <th className="pb-4">Submitted On</th>
                  <th className="pb-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filteredApplications.length > 0 ? (
                  filteredApplications.map((item) => (
                    <tr key={item.id} className="text-sm text-gray-700 hover:bg-gray-50/50">
                      <td className="py-4 font-bold text-gray-950">{item.id}</td>
                      <td className="py-4">
                        <div className="font-semibold text-gray-900">{item.name}</div>
                        <div className="text-xs text-gray-400">{item.passport}</div>
                      </td>
                      <td className="py-4 text-xs font-semibold">
                        <span className={`px-2.5 py-1 rounded-full ${
                          item.category === "Corporate" ? "bg-red-50 text-red-600" :
                          item.category === "Agents" ? "bg-yellow-50 text-yellow-600" : "bg-blue-50 text-blue-600"
                        }`}>
                          {item.category}
                        </span>
                      </td>
                      <td className="py-4 font-semibold"><span className="flex items-center gap-2">{getCountryFlag(item.country)} {item.country}</span></td>
                      <td className="py-4">{item.visaType}</td>
                      <td className="py-4">
                        <select
                          value={item.status}
                          onChange={(e) => updateStatus(item.category, item.id, e.target.value)}
                          className={`rounded-xl px-3 py-1 outline-none text-xs font-semibold border ${getStatusColor(item.status)}`}
                        >
                          <option value="Pending">Pending</option>
                          <option value="Documents Received">Documents Received</option>
                          <option value="Under Review">Under Review</option>
                          <option value="Approved">Approved</option>
                          <option value="Rejected">Rejected</option>
                        </select>
                      </td>
                      <td className="py-4 text-gray-500 font-semibold">{item.submittedOn}</td>
                      <td className="py-4 text-right">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => setSelectedApplication(item)}
                            className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 flex items-center justify-center"
                          >
                            <FaEye size={12} />
                          </button>
                          <button
                            onClick={() => {
                              setEditData(item);
                              setFormData(item);
                              setShowAddForm(true);
                            }}
                            className="w-8 h-8 rounded-full bg-yellow-50 text-yellow-600 hover:bg-yellow-100 flex items-center justify-center"
                          >
                            <FaEdit size={12} />
                          </button>
                          <button
                            onClick={() => downloadApplication(item)}
                            className="w-8 h-8 rounded-full bg-green-50 text-green-600 hover:bg-green-100 flex items-center justify-center"
                          >
                            <FaDownload size={12} />
                          </button>
                          <button
                            onClick={() => deleteApplication(item.category, item.id)}
                            className="w-8 h-8 rounded-full bg-red-50 text-red-600 hover:bg-red-100 flex items-center justify-center"
                          >
                            <FaTrash size={12} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="text-center py-12 text-gray-400 text-sm">
                      No applications match filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  const renderIndividualApplications = () => {
    const list = visaData.Individuals.filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(indSearch.toLowerCase()) ||
        item.passport.toLowerCase().includes(indSearch.toLowerCase()) ||
        item.id.toLowerCase().includes(indSearch.toLowerCase()) ||
        item.country.toLowerCase().includes(indSearch.toLowerCase());

      const matchesStatus = indSubTab === "All" ? true : item.status === indSubTab;
      const matchesCountry = indCountry === "All" ? true : item.country === indCountry;

      return matchesSearch && matchesStatus && matchesCountry;
    });

    return (
      <div>
        {/* Header with circular icon & breadcrumbs */}
        <div className="flex items-center gap-4 mt-6">
          <div className="w-14 h-14 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-500/25">
            <FaPassport className="text-2xl" />
          </div>
          <div>
            <div className="text-xs font-bold text-gray-400 uppercase tracking-wider">Dashboard &gt; Individual Applications</div>
            <h2 className="text-2xl font-bold text-gray-900 mt-0.5">Individual Applications</h2>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm mt-8 flex flex-col xl:flex-row items-center gap-4 justify-between">
          <div className="relative w-full xl:max-w-md">
            <FaSearch className="absolute top-1/2 -translate-y-1/2 left-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name, ref no, passport..."
              value={indSearch}
              onChange={(e) => setIndSearch(e.target.value)}
              className="w-full bg-gray-50 border border-gray-100 rounded-2xl pl-11 pr-4 py-3.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 font-medium"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full xl:w-auto items-stretch sm:items-center">
            <select
              value={indSubTab}
              onChange={(e) => setIndSubTab(e.target.value)}
              className="bg-gray-50 border border-gray-100 rounded-2xl px-4 py-3.5 text-sm text-gray-700 outline-none font-semibold cursor-pointer min-w-[140px]"
            >
              <option value="All">All Statuses</option>
              <option value="Pending">Pending</option>
              <option value="Documents Received">Documents Received</option>
              <option value="Under Review">Under Review</option>
              <option value="Approved">Approved</option>
              <option value="Rejected">Rejected</option>
            </select>

            <select
              value={indCountry}
              onChange={(e) => setIndCountry(e.target.value)}
              className="bg-gray-50 border border-gray-100 rounded-2xl px-4 py-3.5 text-sm text-gray-700 outline-none font-semibold cursor-pointer min-w-[140px]"
            >
              {uniqueCountries.map((c) => (
                <option key={c} value={c}>
                  {c === "All" ? "All Countries" : c}
                </option>
              ))}
            </select>

            {/* Date range picker mockup */}
            <div className="bg-gray-50 border border-gray-100 rounded-2xl px-5 py-3.5 text-sm text-gray-600 font-semibold flex items-center gap-2">
              <span>01 May 2026 - 31 May 2026</span>
            </div>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3.5 rounded-2xl text-sm transition-all duration-200"
            >
              Filter
            </motion.button>
          </div>
        </div>

        {/* Tab Counters Row */}
        <div className="bg-white border border-gray-100 rounded-3xl shadow-sm mt-8 overflow-hidden">
          <div className="flex border-b border-gray-100 overflow-x-auto">
            {[
              { id: "All", label: "All", count: getIndividualCounts.all },
              { id: "Pending", label: "Pending", count: getIndividualCounts.pending },
              { id: "Documents Received", label: "Documents Received", count: getIndividualCounts.docReceived },
              { id: "Under Review", label: "Under Review", count: getIndividualCounts.underReview },
              { id: "Approved", label: "Approved", count: getIndividualCounts.approved },
              { id: "Rejected", label: "Rejected", count: getIndividualCounts.rejected }
            ].map((sub) => (
              <button
                key={sub.id}
                onClick={() => setIndSubTab(sub.id)}
                className={`px-6 py-4 text-sm font-bold border-b-2 whitespace-nowrap transition-all duration-200 ${
                  indSubTab === sub.id
                    ? "border-blue-600 text-blue-600 bg-blue-50/20"
                    : "border-transparent text-gray-400 hover:text-gray-600"
                }`}
              >
                {sub.label} ({sub.count.toLocaleString()})
              </button>
            ))}
          </div>

          {/* Table */}
          <div className="overflow-x-auto p-6">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-100 text-gray-400 text-xs font-bold uppercase">
                  <th className="pb-4">Ref No</th>
                  <th className="pb-4">Applicant Name</th>
                  <th className="pb-4">Passport No</th>
                  <th className="pb-4">Country</th>
                  <th className="pb-4">Visa Type</th>
                  <th className="pb-4">Status</th>
                  <th className="pb-4">Submitted On</th>
                  <th className="pb-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {list.length > 0 ? (
                  list.map((item) => (
                    <motion.tr
                      layout
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2 }}
                      key={item.id}
                      className="text-sm text-gray-700 hover:bg-gray-50/50"
                    >
                      <td className="py-4 font-bold text-gray-950">{item.id}</td>
                      <td className="py-4 font-bold text-gray-900">{item.name}</td>
                      <td className="py-4 font-semibold text-gray-500">{item.passport}</td>
                      <td className="py-4 font-semibold text-gray-900">
                        <span className="mr-2 text-base">{getCountryFlag(item.country)}</span>
                        <span>{item.country}</span>
                      </td>
                      <td className="py-4 font-medium">{item.visaType}</td>
                      <td className="py-4">
                        <select
                          value={item.status}
                          onChange={(e) => updateStatus(item.category, item.id, e.target.value)}
                          className={`rounded-xl px-3 py-1 outline-none text-xs font-semibold border ${getStatusColor(item.status)}`}
                        >
                          <option value="Pending">Pending</option>
                          <option value="Documents Received">Documents Received</option>
                          <option value="Under Review">Under Review</option>
                          <option value="Approved">Approved</option>
                          <option value="Rejected">Rejected</option>
                        </select>
                      </td>
                      <td className="py-4 text-gray-500 font-semibold">{item.submittedOn}</td>
                      <td className="py-4 text-right">
                        <div className="flex justify-end gap-2">
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => setSelectedApplication(item)}
                            className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 flex items-center justify-center"
                          >
                            <FaEye size={12} />
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => {
                              setEditData(item);
                              setFormData(item);
                              setShowAddForm(true);
                            }}
                            className="w-8 h-8 rounded-full bg-yellow-50 text-yellow-600 hover:bg-yellow-100 flex items-center justify-center"
                          >
                            <FaEdit size={12} />
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => deleteApplication(item.category, item.id)}
                            className="w-8 h-8 rounded-full bg-red-50 text-red-600 hover:bg-red-100 flex items-center justify-center"
                          >
                            <FaTrash size={12} />
                          </motion.button>
                        </div>
                      </td>
                    </motion.tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="text-center py-12 text-gray-400 text-sm font-semibold">
                      No applications found matching filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  const renderCorporateApplications = () => {
    const list = visaData.Corporate.filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(corpSearch.toLowerCase()) ||
        (item.companyName && item.companyName.toLowerCase().includes(corpSearch.toLowerCase())) ||
        (item.contactPerson && item.contactPerson.toLowerCase().includes(corpSearch.toLowerCase())) ||
        item.id.toLowerCase().includes(corpSearch.toLowerCase()) ||
        item.country.toLowerCase().includes(corpSearch.toLowerCase());

      const matchesStatus = corpSubTab === "All" ? true : item.status === corpSubTab;
      const matchesCountry = corpCountry === "All" ? true : item.country === corpCountry;

      return matchesSearch && matchesStatus && matchesCountry;
    });

    return (
      <div>
        {/* Header with circular icon & breadcrumbs */}
        <div className="flex items-center gap-4 mt-6">
          <div className="w-14 h-14 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-500/25">
            <FaBuilding className="text-2xl" />
          </div>
          <div>
            <div className="text-xs font-bold text-gray-400 uppercase tracking-wider">Dashboard &gt; Corporate Applications</div>
            <h2 className="text-2xl font-bold text-gray-900 mt-0.5">Corporate Applications</h2>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm mt-8 flex flex-col xl:flex-row items-center gap-4 justify-between">
          <div className="relative w-full xl:max-w-md">
            <FaSearch className="absolute top-1/2 -translate-y-1/2 left-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by company name, contact, passport..."
              value={corpSearch}
              onChange={(e) => setCorpSearch(e.target.value)}
              className="w-full bg-gray-50 border border-gray-100 rounded-2xl pl-11 pr-4 py-3.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 font-medium"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full xl:w-auto items-stretch sm:items-center">
            <select
              value={corpSubTab}
              onChange={(e) => setCorpSubTab(e.target.value)}
              className="bg-gray-50 border border-gray-100 rounded-2xl px-4 py-3.5 text-sm text-gray-700 outline-none font-semibold cursor-pointer min-w-[140px]"
            >
              <option value="All">All Statuses</option>
              <option value="Pending">Pending</option>
              <option value="Documents Received">Documents Received</option>
              <option value="Under Review">Under Review</option>
              <option value="Approved">Approved</option>
              <option value="Rejected">Rejected</option>
            </select>

            <select
              value={corpCountry}
              onChange={(e) => setCorpCountry(e.target.value)}
              className="bg-gray-50 border border-gray-100 rounded-2xl px-4 py-3.5 text-sm text-gray-700 outline-none font-semibold cursor-pointer min-w-[140px]"
            >
              {uniqueCountries.map((c) => (
                <option key={c} value={c}>
                  {c === "All" ? "All Countries" : c}
                </option>
              ))}
            </select>

            {/* Date range picker mockup */}
            <div className="bg-gray-50 border border-gray-100 rounded-2xl px-5 py-3.5 text-sm text-gray-600 font-semibold flex items-center gap-2">
              <span>01 May 2026 - 31 May 2026</span>
            </div>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3.5 rounded-2xl text-sm transition-all duration-200"
            >
              Filter
            </motion.button>
          </div>
        </div>

        {/* Tab Counters Row */}
        <div className="bg-white border border-gray-100 rounded-3xl shadow-sm mt-8 overflow-hidden">
          <div className="flex border-b border-gray-100 overflow-x-auto">
            {[
              { id: "All", label: "All", count: getCorporateCounts.all },
              { id: "Pending", label: "Pending", count: getCorporateCounts.pending },
              { id: "Documents Received", label: "Documents Received", count: getCorporateCounts.docReceived },
              { id: "Under Review", label: "Under Review", count: getCorporateCounts.underReview },
              { id: "Approved", label: "Approved", count: getCorporateCounts.approved },
              { id: "Rejected", label: "Rejected", count: getCorporateCounts.rejected }
            ].map((sub) => (
              <button
                key={sub.id}
                onClick={() => setCorpSubTab(sub.id)}
                className={`px-6 py-4 text-sm font-bold border-b-2 whitespace-nowrap transition-all duration-200 ${
                  corpSubTab === sub.id
                    ? "border-blue-600 text-blue-600 bg-blue-50/20"
                    : "border-transparent text-gray-400 hover:text-gray-600"
                }`}
              >
                {sub.label} ({sub.count.toLocaleString()})
              </button>
            ))}
          </div>

          {/* Table */}
          <div className="overflow-x-auto p-6">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-100 text-gray-400 text-xs font-bold uppercase">
                  <th className="pb-4">Ref No</th>
                  <th className="pb-4">Company Name</th>
                  <th className="pb-4">Contact Person</th>
                  <th className="pb-4">Country</th>
                  <th className="pb-4">Visa Type</th>
                  <th className="pb-4">Status</th>
                  <th className="pb-4">Submitted On</th>
                  <th className="pb-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {list.length > 0 ? (
                  list.map((item) => (
                    <motion.tr
                      layout
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2 }}
                      key={item.id}
                      className="text-sm text-gray-700 hover:bg-gray-50/50"
                    >
                      <td className="py-4 font-bold text-gray-950">{item.id}</td>
                      <td className="py-4 font-bold text-gray-900">{item.companyName || item.name}</td>
                      <td className="py-4 font-semibold text-gray-500">{item.contactPerson || "HR Manager"}</td>
                      <td className="py-4 font-semibold text-gray-900">
                        <span className="mr-2 text-base">{getCountryFlag(item.country)}</span>
                        <span>{item.country}</span>
                      </td>
                      <td className="py-4 font-medium">{item.visaType}</td>
                      <td className="py-4">
                        <select
                          value={item.status}
                          onChange={(e) => updateStatus(item.category, item.id, e.target.value)}
                          className={`rounded-xl px-3 py-1 outline-none text-xs font-semibold border ${getStatusColor(item.status)}`}
                        >
                          <option value="Pending">Pending</option>
                          <option value="Documents Received">Documents Received</option>
                          <option value="Under Review">Under Review</option>
                          <option value="Approved">Approved</option>
                          <option value="Rejected">Rejected</option>
                        </select>
                      </td>
                      <td className="py-4 text-gray-500 font-semibold">{item.submittedOn}</td>
                      <td className="py-4 text-right">
                        <div className="flex justify-end gap-2">
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => setSelectedApplication(item)}
                            className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 flex items-center justify-center"
                          >
                            <FaEye size={12} />
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => {
                              setEditData(item);
                              setFormData(item);
                              setShowAddForm(true);
                            }}
                            className="w-8 h-8 rounded-full bg-yellow-50 text-yellow-600 hover:bg-yellow-100 flex items-center justify-center"
                          >
                            <FaEdit size={12} />
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => deleteApplication(item.category, item.id)}
                            className="w-8 h-8 rounded-full bg-red-50 text-red-600 hover:bg-red-100 flex items-center justify-center"
                          >
                            <FaTrash size={12} />
                          </motion.button>
                        </div>
                      </td>
                    </motion.tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="text-center py-12 text-gray-400 text-sm font-semibold">
                      No corporate applications matching filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  const renderAgentApplications = () => {
    const list = visaData.Agents.filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(agentSearch.toLowerCase()) ||
        (item.agentName && item.agentName.toLowerCase().includes(agentSearch.toLowerCase())) ||
        (item.agencyName && item.agencyName.toLowerCase().includes(agentSearch.toLowerCase())) ||
        item.id.toLowerCase().includes(agentSearch.toLowerCase()) ||
        item.country.toLowerCase().includes(agentSearch.toLowerCase());

      const matchesStatus = agentSubTab === "All" ? true : item.status === agentSubTab;
      const matchesCountry = agentCountry === "All" ? true : item.country === agentCountry;

      return matchesSearch && matchesStatus && matchesCountry;
    });

    return (
      <div>
        {/* Header with circular icon & breadcrumbs */}
        <div className="flex items-center gap-4 mt-6">
          <div className="w-14 h-14 rounded-full bg-red-600 text-white flex items-center justify-center shadow-lg shadow-red-500/25">
            <FaUserTie className="text-2xl" />
          </div>
          <div>
            <div className="text-xs font-bold text-gray-400 uppercase tracking-wider">Dashboard &gt; Agent Applications</div>
            <h2 className="text-2xl font-bold text-gray-900 mt-0.5">Agent Applications</h2>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm mt-8 flex flex-col xl:flex-row items-center gap-4 justify-between">
          <div className="relative w-full xl:max-w-md">
            <FaSearch className="absolute top-1/2 -translate-y-1/2 left-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by agent name, agency, ref no..."
              value={agentSearch}
              onChange={(e) => setAgentSearch(e.target.value)}
              className="w-full bg-gray-50 border border-gray-100 rounded-2xl pl-11 pr-4 py-3.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 font-medium"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full xl:w-auto items-stretch sm:items-center">
            <select
              value={agentSubTab}
              onChange={(e) => setAgentSubTab(e.target.value)}
              className="bg-gray-50 border border-gray-100 rounded-2xl px-4 py-3.5 text-sm text-gray-700 outline-none font-semibold cursor-pointer min-w-[140px]"
            >
              <option value="All">All Statuses</option>
              <option value="Pending">Pending</option>
              <option value="Documents Received">Documents Received</option>
              <option value="Under Review">Under Review</option>
              <option value="Approved">Approved</option>
              <option value="Rejected">Rejected</option>
            </select>

            <select
              value={agentCountry}
              onChange={(e) => setAgentCountry(e.target.value)}
              className="bg-gray-50 border border-gray-100 rounded-2xl px-4 py-3.5 text-sm text-gray-700 outline-none font-semibold cursor-pointer min-w-[140px]"
            >
              {uniqueCountries.map((c) => (
                <option key={c} value={c}>
                  {c === "All" ? "All Countries" : c}
                </option>
              ))}
            </select>

            {/* Date range picker mockup */}
            <div className="bg-gray-50 border border-gray-100 rounded-2xl px-5 py-3.5 text-sm text-gray-600 font-semibold flex items-center gap-2">
              <span>01 May 2026 - 31 May 2026</span>
            </div>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3.5 rounded-2xl text-sm transition-all duration-200"
            >
              Filter
            </motion.button>
          </div>
        </div>

        {/* Tab Counters Row */}
        <div className="bg-white border border-gray-100 rounded-3xl shadow-sm mt-8 overflow-hidden">
          <div className="flex border-b border-gray-100 overflow-x-auto">
            {[
              { id: "All", label: "All", count: getAgentCounts.all },
              { id: "Pending", label: "Pending", count: getAgentCounts.pending },
              { id: "Documents Received", label: "Documents Received", count: getAgentCounts.docReceived },
              { id: "Under Review", label: "Under Review", count: getAgentCounts.underReview },
              { id: "Approved", label: "Approved", count: getAgentCounts.approved },
              { id: "Rejected", label: "Rejected", count: getAgentCounts.rejected }
            ].map((sub) => (
              <button
                key={sub.id}
                onClick={() => setAgentSubTab(sub.id)}
                className={`px-6 py-4 text-sm font-bold border-b-2 whitespace-nowrap transition-all duration-200 ${
                  agentSubTab === sub.id
                    ? "border-blue-600 text-blue-600 bg-blue-50/20"
                    : "border-transparent text-gray-400 hover:text-gray-600"
                }`}
              >
                {sub.label} ({sub.count.toLocaleString()})
              </button>
            ))}
          </div>

          {/* Table */}
          <div className="overflow-x-auto p-6">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-100 text-gray-400 text-xs font-bold uppercase">
                  <th className="pb-4">Ref No</th>
                  <th className="pb-4">Agent Name</th>
                  <th className="pb-4">Agency Name</th>
                  <th className="pb-4">Country</th>
                  <th className="pb-4">Visa Type</th>
                  <th className="pb-4">Status</th>
                  <th className="pb-4">Submitted On</th>
                  <th className="pb-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {list.length > 0 ? (
                  list.map((item) => (
                    <motion.tr
                      layout
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2 }}
                      key={item.id}
                      className="text-sm text-gray-700 hover:bg-gray-50/50"
                    >
                      <td className="py-4 font-bold text-gray-950">{item.id}</td>
                      <td className="py-4 font-bold text-gray-900">{item.agentName || item.name}</td>
                      <td className="py-4 font-semibold text-gray-500">{item.agencyName || "Global Travel Ltd"}</td>
                      <td className="py-4 font-semibold text-gray-900">
                        <span className="mr-2 text-base">{getCountryFlag(item.country)}</span>
                        <span>{item.country}</span>
                      </td>
                      <td className="py-4 font-medium">{item.visaType}</td>
                      <td className="py-4">
                        <select
                          value={item.status}
                          onChange={(e) => updateStatus(item.category, item.id, e.target.value)}
                          className={`rounded-xl px-3 py-1 outline-none text-xs font-semibold border ${getStatusColor(item.status)}`}
                        >
                          <option value="Pending">Pending</option>
                          <option value="Documents Received">Documents Received</option>
                          <option value="Under Review">Under Review</option>
                          <option value="Approved">Approved</option>
                          <option value="Rejected">Rejected</option>
                        </select>
                      </td>
                      <td className="py-4 text-gray-500 font-semibold">{item.submittedOn}</td>
                      <td className="py-4 text-right">
                        <div className="flex justify-end gap-2">
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => setSelectedApplication(item)}
                            className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 flex items-center justify-center"
                          >
                            <FaEye size={12} />
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => {
                              setEditData(item);
                              setFormData(item);
                              setShowAddForm(true);
                            }}
                            className="w-8 h-8 rounded-full bg-yellow-50 text-yellow-600 hover:bg-yellow-100 flex items-center justify-center"
                          >
                            <FaEdit size={12} />
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => deleteApplication(item.category, item.id)}
                            className="w-8 h-8 rounded-full bg-red-50 text-red-600 hover:bg-red-100 flex items-center justify-center"
                          >
                            <FaTrash size={12} />
                          </motion.button>
                        </div>
                      </td>
                    </motion.tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="text-center py-12 text-gray-400 text-sm font-semibold">
                      No agent applications matching filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  const renderDocumentsReceived = () => {
    const list = allApplications.filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(docSearch.toLowerCase()) ||
        item.id.toLowerCase().includes(docSearch.toLowerCase()) ||
        (item.docType && item.docType.toLowerCase().includes(docSearch.toLowerCase())) ||
        (item.verifiedBy && item.verifiedBy.toLowerCase().includes(docSearch.toLowerCase()));

      const matchesSubTab =
        docSubTab === "All" ? true :
        docSubTab === "Individual" ? item.category === "Individuals" :
        docSubTab === "Corporate" ? item.category === "Corporate" :
        docSubTab === "Agents" ? item.category === "Agents" : true;

      const matchesCountry = docCountry === "All" ? true : item.country === docCountry;

      return matchesSearch && matchesSubTab && matchesCountry;
    });

    return (
      <div>
        {/* Header with circular icon & breadcrumbs */}
        <div className="flex items-center gap-4 mt-6">
          <div className="w-14 h-14 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-500/25">
            <FaFileAlt className="text-2xl" />
          </div>
          <div>
            <div className="text-xs font-bold text-gray-400 uppercase tracking-wider">Dashboard &gt; Documents Received</div>
            <h2 className="text-2xl font-bold text-gray-900 mt-0.5">Documents Received</h2>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm mt-8 flex flex-col xl:flex-row items-center gap-4 justify-between">
          <div className="relative w-full xl:max-w-md">
            <FaSearch className="absolute top-1/2 -translate-y-1/2 left-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name, ref no, document..."
              value={docSearch}
              onChange={(e) => setDocSearch(e.target.value)}
              className="w-full bg-gray-50 border border-gray-100 rounded-2xl pl-11 pr-4 py-3.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 font-medium"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full xl:w-auto items-stretch sm:items-center">
            <select
              value={docSubTab}
              onChange={(e) => setDocSubTab(e.target.value)}
              className="bg-gray-50 border border-gray-100 rounded-2xl px-4 py-3.5 text-sm text-gray-700 outline-none font-semibold cursor-pointer min-w-[140px]"
            >
              <option value="All">All Categories</option>
              <option value="Individual">Individual</option>
              <option value="Corporate">Corporate</option>
              <option value="Agents">Agents</option>
            </select>

            <select
              value={docCountry}
              onChange={(e) => setDocCountry(e.target.value)}
              className="bg-gray-50 border border-gray-100 rounded-2xl px-4 py-3.5 text-sm text-gray-700 outline-none font-semibold cursor-pointer min-w-[140px]"
            >
              {uniqueCountries.map((c) => (
                <option key={c} value={c}>
                  {c === "All" ? "All Countries" : c}
                </option>
              ))}
            </select>

            {/* Date range picker mockup */}
            <div className="bg-gray-50 border border-gray-100 rounded-2xl px-5 py-3.5 text-sm text-gray-600 font-semibold flex items-center gap-2">
              <span>01 May 2026 - 31 May 2026</span>
            </div>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3.5 rounded-2xl text-sm transition-all duration-200"
            >
              Filter
            </motion.button>
          </div>
        </div>

        {/* Tab Counters Row */}
        <div className="bg-white border border-gray-100 rounded-3xl shadow-sm mt-8 overflow-hidden">
          <div className="flex border-b border-gray-100 overflow-x-auto">
            {[
              { id: "All", label: "All", count: getDocumentCounts.all },
              { id: "Individual", label: "Individual", count: getDocumentCounts.individual },
              { id: "Corporate", label: "Corporate", count: getDocumentCounts.corporate },
              { id: "Agents", label: "Agents", count: getDocumentCounts.agents }
            ].map((sub) => (
              <button
                key={sub.id}
                onClick={() => setDocSubTab(sub.id)}
                className={`px-6 py-4 text-sm font-bold border-b-2 whitespace-nowrap transition-all duration-200 ${
                  docSubTab === sub.id
                    ? "border-blue-600 text-blue-600 bg-blue-50/20"
                    : "border-transparent text-gray-400 hover:text-gray-600"
                }`}
              >
                {sub.label} ({sub.count.toLocaleString()})
              </button>
            ))}
          </div>

          {/* Table */}
          <div className="overflow-x-auto p-6">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-100 text-gray-400 text-xs font-bold uppercase">
                  <th className="pb-4">Ref No</th>
                  <th className="pb-4">Applicant Name</th>
                  <th className="pb-4">Document Type</th>
                  <th className="pb-4">Received On</th>
                  <th className="pb-4">Verified By</th>
                  <th className="pb-4">Status</th>
                  <th className="pb-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {list.length > 0 ? (
                  list.map((item) => (
                    <motion.tr
                      layout
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2 }}
                      key={item.id}
                      className="text-sm text-gray-700 hover:bg-gray-50/50"
                    >
                      <td className="py-4 font-bold text-gray-950">{item.id}</td>
                      <td className="py-4 font-bold text-gray-900">
                        <span>{item.name}</span>
                        <span className="ml-2 text-xs text-gray-400">({item.category})</span>
                      </td>
                      <td className="py-4 text-xs font-bold text-blue-600 uppercase">{item.docType || "Passport Copy"}</td>
                      <td className="py-4 text-gray-500 font-semibold">{item.receivedOn || item.submittedOn}</td>
                      <td className="py-4 text-gray-600 font-semibold">{item.verifiedBy || "System"}</td>
                      <td className="py-4">
                        <select
                          value={item.status === "Pending" ? "Pending" : "Verified"}
                          onChange={(e) => {
                            const isVerified = e.target.value === "Verified";
                            updateStatus(item.category, item.id, isVerified ? "Documents Received" : "Pending");
                          }}
                          className={`rounded-xl px-3 py-1 outline-none text-xs font-semibold border ${
                            item.status === "Pending" ? "bg-yellow-50 text-yellow-600 border-yellow-100" : "bg-green-50 text-green-600 border-green-100"
                          }`}
                        >
                          <option value="Verified">Verified</option>
                          <option value="Pending">Pending</option>
                        </select>
                      </td>
                      <td className="py-4 text-right">
                        <div className="flex justify-end gap-2">
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => setSelectedApplication(item)}
                            className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 flex items-center justify-center"
                          >
                            <FaEye size={12} />
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => downloadApplication(item)}
                            className="w-8 h-8 rounded-full bg-green-50 text-green-600 hover:bg-green-100 flex items-center justify-center"
                          >
                            <FaDownload size={12} />
                          </motion.button>
                        </div>
                      </td>
                    </motion.tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="text-center py-12 text-gray-400 text-sm font-semibold">
                      No documents matching filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  const renderPendingApplications = () => {
    const list = allApplications.filter((item) => {
      if (item.status !== "Pending") return false;

      const matchesSearch =
        item.name.toLowerCase().includes(pendingSearch.toLowerCase()) ||
        item.id.toLowerCase().includes(pendingSearch.toLowerCase()) ||
        (item.pendingReason && item.pendingReason.toLowerCase().includes(pendingSearch.toLowerCase())) ||
        item.country.toLowerCase().includes(pendingSearch.toLowerCase());

      const reasonLower = (item.pendingReason || "").toLowerCase();
      const isMissingDocs = reasonLower.includes("document") || reasonLower.includes("missing");
      const isEmbassy = reasonLower.includes("embassy") || reasonLower.includes("processing") || reasonLower.includes("response");

      const matchesSubTab =
        pendingSubTab === "All" ? true :
        pendingSubTab === "Missing Documents" ? isMissingDocs :
        pendingSubTab === "Embassy Review" ? isEmbassy :
        pendingSubTab === "Other Reasons" ? (!isMissingDocs && !isEmbassy) : true;

      const matchesCountry = pendingCountry === "All" ? true : item.country === pendingCountry;

      return matchesSearch && matchesSubTab && matchesCountry;
    });

    return (
      <div>
        {/* Header with circular icon & breadcrumbs */}
        <div className="flex items-center gap-4 mt-6">
          <div className="w-12 h-12 rounded-full bg-red-500 text-white flex items-center justify-center shadow-md shadow-red-500/25">
            <FaFileAlt className="text-[20px]" />
          </div>
          <div className="flex flex-col">
            <h2 className="text-[22px] font-bold text-[#3B4256] leading-tight mt-0.5">Pending Applications</h2>
            <div className="text-[11px] font-bold text-gray-400 flex items-center gap-1.5 uppercase mt-1">
              Dashboard <FaChevronRight size={8} /> Pending Applications
            </div>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm mt-8 flex flex-col xl:flex-row items-center gap-4 justify-between">
          <div className="relative w-full xl:max-w-md">
            <FaSearch className="absolute top-1/2 -translate-y-1/2 left-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search pending applications..."
              value={pendingSearch}
              onChange={(e) => setPendingSearch(e.target.value)}
              className="w-full bg-gray-50 border border-gray-100 rounded-2xl pl-11 pr-4 py-3.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 font-medium"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full xl:w-auto items-stretch sm:items-center">
            <select
              value={pendingSubTab}
              onChange={(e) => setPendingSubTab(e.target.value)}
              className="bg-gray-50 border border-gray-100 rounded-2xl px-4 py-3.5 text-sm text-gray-700 outline-none font-semibold cursor-pointer min-w-[160px]"
            >
              <option value="All">All Reasons</option>
              <option value="Missing Documents">Missing Documents</option>
              <option value="Embassy Review">Embassy Review</option>
              <option value="Other Reasons">Other Reasons</option>
            </select>

            <select
              value={pendingCountry}
              onChange={(e) => setPendingCountry(e.target.value)}
              className="bg-gray-50 border border-gray-100 rounded-2xl px-4 py-3.5 text-sm text-gray-700 outline-none font-semibold cursor-pointer min-w-[140px]"
            >
              {uniqueCountries.map((c) => (
                <option key={c} value={c}>
                  {c === "All" ? "All Countries" : c}
                </option>
              ))}
            </select>

            {/* Date range picker mockup */}
            <div className="bg-gray-50 border border-gray-100 rounded-2xl px-5 py-3.5 text-sm text-gray-600 font-semibold flex items-center gap-2">
              <span>01 May 2026 - 31 May 2026</span>
            </div>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3.5 rounded-2xl text-sm transition-all duration-200"
            >
              Filter
            </motion.button>
          </div>
        </div>

        {/* Tab Counters Row */}
        <div className="bg-white border border-gray-100 rounded-3xl shadow-sm mt-8 overflow-hidden">
          <div className="flex border-b border-gray-100 overflow-x-auto">
            {[
              { id: "All", label: "All", count: getPendingSectionCounts.all },
              { id: "Missing Documents", label: "Missing Documents", count: getPendingSectionCounts.missingDocs },
              { id: "Embassy Review", label: "Embassy Review", count: getPendingSectionCounts.embassyReview },
              { id: "Other Reasons", label: "Other Reasons", count: getPendingSectionCounts.others }
            ].map((sub) => (
              <button
                key={sub.id}
                onClick={() => setPendingSubTab(sub.id)}
                className={`px-6 py-4 text-sm font-bold border-b-2 whitespace-nowrap transition-all duration-200 ${
                  pendingSubTab === sub.id
                    ? "border-blue-600 text-blue-600 bg-blue-50/20"
                    : "border-transparent text-gray-400 hover:text-gray-600"
                }`}
              >
                {sub.label} ({sub.count.toLocaleString()})
              </button>
            ))}
          </div>

          {/* Table */}
          <div className="overflow-x-auto p-6">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-100 text-gray-400 text-xs font-bold uppercase">
                  <th className="pb-4">Ref No</th>
                  <th className="pb-4">Applicant Name</th>
                  <th className="pb-4">Category</th>
                  <th className="pb-4">Pending Reason</th>
                  <th className="pb-4">Updated On</th>
                  <th className="pb-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {list.length > 0 ? (
                  list.map((item) => (
                    <motion.tr
                      layout
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2 }}
                      key={item.id}
                      className="text-sm text-gray-700 hover:bg-gray-50/50"
                    >
                      <td className="py-4 font-bold text-gray-950">{item.id}</td>
                      <td className="py-4 font-bold text-gray-900">{item.name}</td>
                      <td className="py-4 text-xs font-semibold text-yellow-600">{item.category}</td>
                      <td className="py-4 text-xs text-red-500 font-semibold bg-red-50/50 px-3 py-1 rounded-xl">
                        {item.pendingReason || "Awaiting Verification"}
                      </td>
                      <td className="py-4 text-gray-500 font-semibold">{item.updatedOn || item.submittedOn}</td>
                      <td className="py-4 text-right">
                        <div className="flex justify-end gap-2">
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => setSelectedApplication(item)}
                            className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 flex items-center justify-center"
                          >
                            <FaEye size={12} />
                          </motion.button>
                          <select
                            value={item.status}
                            onChange={(e) => updateStatus(item.category, item.id, e.target.value)}
                            className={`rounded-xl px-3 py-1 outline-none text-xs font-semibold border ${getStatusColor(item.status)}`}
                          >
                            <option value="Pending">Pending</option>
                            <option value="Documents Received">Documents Received</option>
                            <option value="Under Review">Under Review</option>
                            <option value="Approved">Approved</option>
                            <option value="Rejected">Rejected</option>
                          </select>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => updateStatus(item.category, item.id, "Approved")}
                            className="px-3 py-1 bg-green-500 text-white rounded-xl text-xs font-bold hover:bg-green-600"
                          >
                            Approve
                          </motion.button>
                        </div>
                      </td>
                    </motion.tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center py-12 text-gray-400 text-sm font-semibold">
                      No pending applications matching filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  const renderApprovedApplications = () => {
    const list = allApplications.filter(a => a.status === "Approved");
    return (
      <div>
        <div className="mt-6 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white shadow-md">
            <FaCheckCircle className="text-xl" />
          </div>
          <div>
            <div className="text-xs font-bold text-gray-400 uppercase tracking-wider">Dashboard &gt; Approved Applications</div>
            <h2 className="text-2xl font-bold text-gray-900 mt-1">Approved Applications</h2>
          </div>
        </div>
        <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm mt-8 overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-100 text-gray-400 text-xs font-bold uppercase">
                <th className="pb-4">Ref No</th>
                <th className="pb-4">Applicant Name</th>
                <th className="pb-4">Country</th>
                <th className="pb-4">Visa Type</th>
                <th className="pb-4">Approved On</th>
                <th className="pb-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {list.map(item => (
                <tr key={item.id} className="text-sm text-gray-700 hover:bg-gray-50/50">
                  <td className="py-4 font-bold text-gray-950">{item.id}</td>
                  <td className="py-4 font-bold text-gray-900">{item.name}</td>
                  <td className="py-4 font-semibold text-gray-900"><span className="flex items-center gap-2">{getCountryFlag(item.country)} {item.country}</span></td>
                  <td className="py-4 font-semibold text-gray-600">{item.visaType}</td>
                  <td className="py-4 text-gray-500 font-semibold">{item.updatedOn || item.submittedOn}</td>
                  <td className="py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button onClick={() => downloadApplication(item)} className="px-3 py-1 bg-blue-600 text-white rounded-xl text-xs font-bold hover:bg-blue-700 flex items-center gap-1">
                        <FaDownload size={10} /> Download
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  const renderRejectedApplications = () => {
    const list = allApplications.filter(a => a.status === "Rejected");
    return (
      <div>
        <div className="mt-6">
          <div className="text-xs font-bold text-gray-400 uppercase tracking-wider">Dashboard &gt; Rejected Applications</div>
          <h2 className="text-2xl font-bold text-gray-900 mt-1">Rejected Applications</h2>
        </div>
        <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm mt-8 overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-100 text-gray-400 text-xs font-bold uppercase">
                <th className="pb-4">Ref No</th>
                <th className="pb-4">Applicant Name</th>
                <th className="pb-4">Country</th>
                <th className="pb-4">Visa Type</th>
                <th className="pb-4">Rejection Reason</th>
                <th className="pb-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {list.map(item => (
                <tr key={item.id} className="text-sm text-gray-700 hover:bg-gray-50/50">
                  <td className="py-4 font-bold text-gray-950">{item.id}</td>
                  <td className="py-4 font-bold text-gray-900">{item.name}</td>
                  <td className="py-4 font-semibold text-gray-900"><span className="flex items-center gap-2">{getCountryFlag(item.country)} {item.country}</span></td>
                  <td className="py-4 font-semibold text-gray-600">{item.visaType}</td>
                  <td className="py-4 text-red-500 font-bold text-xs bg-red-50 px-2 py-1 rounded-xl">{item.pendingReason || "Insufficient Documents"}</td>
                  <td className="py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button onClick={() => setSelectedApplication(item)} className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 flex items-center justify-center"><FaEye size={12} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  const renderVisaTracking = () => {
    return (
      <div className="animate-fade-in">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white shadow-md">
            <FaGlobe className="text-xl" />
          </div>
          <div>
            <div className="text-xs font-bold text-gray-400 uppercase tracking-wider">Dashboard &gt; Visa Tracking</div>
            <h2 className="text-2xl font-bold text-gray-900 mt-1">Visa Tracking</h2>
          </div>
        </div>

        {/* Tracking Card */}
        <div className="bg-white border border-gray-100 rounded-3xl p-6 md:p-8 shadow-sm max-w-4xl mx-auto">
          <form onSubmit={handleTrackingSearch} className="flex gap-4 mb-8">
            <div className="relative flex-1">
              <span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                <FaSearch />
              </span>
              <input
                type="text"
                placeholder="Enter Ref No (e.g. HF1023)"
                value={trackingSearch}
                onChange={(e) => setTrackingSearch(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-2xl pl-11 pr-6 py-4 text-sm font-semibold text-gray-900 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all placeholder:text-gray-400"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-4 rounded-2xl transition-all duration-200 shadow-md flex items-center gap-2 hover:scale-[1.02]"
            >
              Search
            </button>
          </form>

          {trackedApp ? (
            <div className="animate-fade-in">
              <h3 className="text-lg font-bold text-gray-900 mb-6 border-b border-gray-100 pb-3">Tracking Details</h3>
              
              {/* Info grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-12 mb-8 text-sm">
                <div className="flex justify-between items-center pb-2">
                  <span className="text-gray-400 font-semibold">Ref No:</span>
                  <span className="text-gray-900 font-bold">{trackedApp.id}</span>
                </div>
                <div className="flex justify-between items-center pb-2">
                  <span className="text-gray-400 font-semibold">Category:</span>
                  <span className="text-gray-900 font-bold">{trackedApp.category?.slice(0, -1) || "Individual"}</span>
                </div>
                <div className="flex justify-between items-center pb-2">
                  <span className="text-gray-400 font-semibold">Applicant:</span>
                  <span className="text-gray-900 font-bold">{trackedApp.name}</span>
                </div>
                <div className="flex justify-between items-center pb-2">
                  <span className="text-gray-400 font-semibold">Country:</span>
                  <span className="text-gray-900 font-bold flex items-center gap-2">
                    {getCountryFlag(trackedApp.country)} {trackedApp.country}
                  </span>
                </div>
              </div>

              {/* Stepper matching mockup colors and connections */}
              <div className="relative flex flex-col md:flex-row items-center justify-between gap-8 md:gap-4 px-2 my-12">
                {/* Connecting Lines */}
                <div className="absolute top-[28px] left-[50px] right-[50px] h-1 bg-gray-200 rounded-full z-0 hidden md:block">
                  <div className="w-full h-full flex">
                    <div className={`h-full flex-1 ${["Documents Received", "Under Review", "Embassy Processing", "Approved"].includes(trackedApp.status) ? "bg-blue-600" : "bg-gray-200"}`} />
                    <div className={`h-full flex-1 ${["Under Review", "Embassy Processing", "Approved"].includes(trackedApp.status) ? "bg-amber-500" : "bg-gray-200"}`} />
                    <div className={`h-full flex-1 ${["Embassy Processing", "Approved"].includes(trackedApp.status) ? "bg-red-500" : "bg-gray-200"}`} />
                    <div className={`h-full flex-1 ${["Approved"].includes(trackedApp.status) ? "bg-purple-600" : "bg-gray-200"}`} />
                  </div>
                </div>

                {/* Steps */}
                {[
                  {
                    title: "Submitted",
                    date: trackedApp.submittedOn || "20 May 2025",
                    icon: <FaFileAlt size={16} />,
                    activeColor: "bg-blue-600 text-white shadow-blue-500/20 shadow-lg",
                    inactiveColor: "bg-gray-100 text-gray-400",
                    isDone: true
                  },
                  {
                    title: "Documents Received",
                    date: trackedApp.receivedOn || "22 May 2025",
                    icon: <FaPassport size={16} />,
                    activeColor: "bg-blue-600 text-white shadow-blue-500/20 shadow-lg",
                    inactiveColor: "bg-gray-100 text-gray-400",
                    isDone: ["Documents Received", "Under Review", "Embassy Processing", "Approved"].includes(trackedApp.status)
                  },
                  {
                    title: "Under Review",
                    date: trackedApp.updatedOn || "24 May 2025",
                    icon: <FaSearch size={16} />,
                    activeColor: "bg-red-500 text-white shadow-red-500/20 shadow-lg",
                    inactiveColor: "bg-gray-100 text-gray-400",
                    isDone: ["Under Review", "Embassy Processing", "Approved"].includes(trackedApp.status)
                  },
                  {
                    title: "Embassy Processing",
                    date: "26 May 2025",
                    icon: <FaBuilding size={16} />,
                    activeColor: "bg-purple-600 text-white shadow-purple-500/20 shadow-lg",
                    inactiveColor: "bg-gray-100 text-gray-400",
                    isDone: ["Embassy Processing", "Approved"].includes(trackedApp.status)
                  },
                  {
                    title: "Approved",
                    date: trackedApp.status === "Approved" ? trackedApp.updatedOn : "",
                    icon: <FaCheckCircle size={16} />,
                    activeColor: "bg-emerald-600 text-white shadow-emerald-500/20 shadow-lg",
                    inactiveColor: "bg-gray-100 text-gray-400",
                    isDone: trackedApp.status === "Approved"
                  }
                ].map((step, idx) => (
                  <div key={idx} className="flex flex-row md:flex-col items-center gap-4 z-10 w-full md:w-auto text-center">
                    <div className={`w-14 h-14 rounded-full flex items-center justify-center border-4 border-white font-black text-base transition-all duration-300 ${
                      step.isDone ? step.activeColor : step.inactiveColor
                    }`}>
                      {step.icon}
                    </div>
                    <div className="text-left md:text-center mt-2 flex-1 md:flex-initial">
                      <h5 className="font-extrabold text-sm text-gray-900">{step.title}</h5>
                      {step.date && <p className="text-xs text-gray-400 font-semibold mt-1">{step.date}</p>}
                    </div>
                  </div>
                ))}
              </div>

              {/* Remarks Box */}
              <div className="bg-gray-50 border border-gray-100 rounded-2xl p-6 mt-10 text-sm">
                <span className="font-bold text-gray-900 block mb-2">Remarks / Notes</span>
                <p className="text-gray-600 font-medium">{trackedApp.pendingReason || "All documents verified successfully."}</p>
                <div className="text-[10px] text-gray-400 font-bold mt-4">
                  Last Updated: {trackedApp.updatedOn || "28 May 2025"} by <span className="text-gray-600">{adminProfile.name}</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-20 text-gray-400">
              <FaGlobe size={48} className="mx-auto text-gray-200 mb-4 animate-spin-slow" />
              <p className="text-sm font-semibold">Enter a valid Ref ID (e.g. HF1023) above to visualize tracking details.</p>
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderReports = () => {
    return (
      <div>
        <div className="mt-6">
          <div className="text-xs font-bold text-gray-400 uppercase tracking-wider">Dashboard &gt; Reports &amp; Analytics</div>
          <h2 className="text-2xl font-bold text-gray-900 mt-1">Reports &amp; Analytics</h2>
        </div>
        <div className="mt-8">
          <AnalyticsCharts allApplications={allApplications} />
        </div>
      </div>
    );
  };

  const renderClients = () => {
    return (
      <div className="animate-fade-in">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 mt-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Clients / Users</h2>
            <p className="text-sm font-medium text-gray-500 mt-1">Manage portal access and user roles.</p>
          </div>
          <button
            onClick={() => toast.success("Add New User clicked")}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 px-6 rounded-xl transition-all shadow-md self-start md:self-auto flex items-center gap-2"
          >
            <FaPlus size={12} /> Add New User
          </button>
        </div>

        {/* Filters */}
        <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm mb-6 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex items-center gap-2 bg-gray-50 px-4 py-2.5 rounded-xl w-full md:w-auto md:flex-1 min-w-[200px] border border-gray-200">
            <FaSearch className="text-gray-400" />
            <input type="text" placeholder="Search by name or email..." className="bg-transparent border-none outline-none text-sm w-full font-semibold text-gray-700 placeholder-gray-400" />
          </div>
          <div className="flex flex-wrap gap-4 w-full md:w-auto">
            <select className="bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-semibold text-gray-700 outline-none focus:ring-2 focus:ring-blue-500/20">
              <option>All Roles</option>
              <option>Client</option>
              <option>Corporate</option>
              <option>Agent</option>
            </select>
            <select className="bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-semibold text-gray-700 outline-none focus:ring-2 focus:ring-blue-500/20">
              <option>All Status</option>
              <option>Active</option>
              <option>Inactive</option>
            </select>
            <button className="bg-gray-900 text-white px-6 py-2.5 rounded-xl text-sm font-bold shadow-md hover:bg-gray-800 transition-colors">
              Filter
            </button>
          </div>
        </div>

        {/* Data Table */}
        <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm overflow-x-auto">
          <table className="w-full text-left whitespace-nowrap min-w-[800px]">
            <thead>
              <tr className="border-b border-gray-100 text-gray-400 text-xs font-bold uppercase tracking-wider">
                <th className="pb-4">Name</th>
                <th className="pb-4">Email</th>
                <th className="pb-4">Role</th>
                <th className="pb-4">Phone</th>
                <th className="pb-4">Status</th>
                <th className="pb-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {usersData.map((user, i) => (
                <tr key={user.id} className="text-sm text-gray-700 hover:bg-gray-50/50 transition-colors">
                  <td className="py-4 font-bold text-gray-900 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 text-white flex items-center justify-center text-xs shadow-sm">
                      {user.name.charAt(0)}
                    </div>
                    {user.name}
                  </td>
                  <td className="py-4 font-medium text-gray-500">{user.email}</td>
                  <td className="py-4 font-bold text-blue-600">{user.role}</td>
                  <td className="py-4 font-medium text-gray-500">{user.phone}</td>
                  <td className="py-4">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black tracking-wide uppercase ${
                      user.status === "Active" ? "bg-green-100 text-green-700 border border-green-200" : "bg-red-100 text-red-700 border border-red-200"
                    }`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="py-4 text-center">
                    <button className="text-gray-400 hover:text-blue-600 transition-colors px-2"><FaEdit /></button>
                    <button className="text-gray-400 hover:text-red-600 transition-colors px-2"><FaTrash /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  const renderSettings = () => (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="bg-white border border-gray-100 rounded-3xl p-6 md:p-8 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">General Settings</h2>
            <p className="text-sm font-medium text-gray-500 mt-1">Manage your portal preferences and information.</p>
          </div>
          <button
            onClick={handleSaveSettings}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 px-6 rounded-xl transition-all shadow-md self-start md:self-auto"
          >
            Save Changes
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Left Column - Form Inputs */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <label className="block text-xs font-bold text-gray-900 mb-2">Company Name</label>
              <input 
                type="text" 
                value={settingsData.companyName}
                onChange={(e) => setSettingsData({...settingsData, companyName: e.target.value})}
                className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm font-semibold text-gray-900 outline-none focus:ring-2 focus:ring-blue-500/20 transition-all" 
              />
            </div>
            
            <div>
              <label className="block text-xs font-bold text-gray-900 mb-2">Company Logo</label>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shadow-sm text-3xl overflow-hidden">
                  {settingsData.companyLogo && settingsData.companyLogo.startsWith("data:") ? (
                    <img src={settingsData.companyLogo} alt="Logo" className="w-full h-full object-cover" />
                  ) : (
                    <span>{settingsData.companyLogo || "🌐"}</span>
                  )}
                </div>
                <div className="flex flex-col gap-2">
                  <label className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 py-2.5 rounded-xl text-xs shadow-md transition-all inline-block text-center hover:scale-[1.02] duration-200">
                    Upload Custom Image
                    <input 
                      type="file" 
                      accept="image/*" 
                      className="hidden" 
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onload = (event) => {
                            setSettingsData({...settingsData, companyLogo: event.target.result});
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                    />
                  </label>
                  <div className="flex items-center gap-1.5 mt-1">
                    <span className="text-[10px] font-bold text-gray-400 mr-1">Or Preset Emojis:</span>
                    {["🌐", "✈️", "🗺️", "🛂"].map((emoji) => (
                      <button
                        key={emoji}
                        type="button"
                        onClick={() => setSettingsData({...settingsData, companyLogo: emoji})}
                        className={`w-8 h-8 rounded-lg border flex items-center justify-center text-sm transition-all ${settingsData.companyLogo === emoji ? 'border-blue-500 bg-blue-50 shadow-sm' : 'border-gray-200 bg-white'}`}
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-900 mb-2">Support Email</label>
              <input 
                type="email" 
                value={settingsData.supportEmail}
                onChange={(e) => setSettingsData({...settingsData, supportEmail: e.target.value})}
                className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm font-semibold text-gray-900 outline-none focus:ring-2 focus:ring-blue-500/20 transition-all" 
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-900 mb-2">Support Phone</label>
              <input 
                type="text" 
                value={settingsData.supportPhone}
                onChange={(e) => setSettingsData({...settingsData, supportPhone: e.target.value})}
                className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm font-semibold text-gray-900 outline-none focus:ring-2 focus:ring-blue-500/20 transition-all" 
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-gray-900 mb-2">Default Visa Status</label>
                <select 
                  value={settingsData.defaultVisaStatus}
                  onChange={(e) => setSettingsData({...settingsData, defaultVisaStatus: e.target.value})}
                  className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm font-semibold text-gray-900 outline-none focus:ring-2 focus:ring-blue-500/20 transition-all appearance-none cursor-pointer"
                >
                  <option value="Pending">Pending</option>
                  <option value="Documents Received">Documents Received</option>
                  <option value="Under Review">Under Review</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-900 mb-2">Timezone</label>
                <select 
                  value={settingsData.timezone}
                  onChange={(e) => setSettingsData({...settingsData, timezone: e.target.value})}
                  className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm font-semibold text-gray-900 outline-none focus:ring-2 focus:ring-blue-500/20 transition-all appearance-none cursor-pointer"
                >
                  <option value="(GMT-11:00) Midway Island">(GMT-11:00) Midway Island</option>
                  <option value="(GMT-10:00) Hawaii">(GMT-10:00) Hawaii</option>
                  <option value="(GMT-09:00) Alaska">(GMT-09:00) Alaska</option>
                  <option value="(GMT-08:00) Pacific Time (US & Canada)">(GMT-08:00) Pacific Time (US & Canada)</option>
                  <option value="(GMT-07:00) Mountain Time (US & Canada)">(GMT-07:00) Mountain Time (US & Canada)</option>
                  <option value="(GMT-06:00) Central Time (US & Canada)">(GMT-06:00) Central Time (US & Canada)</option>
                  <option value="(GMT-05:00) Eastern Time (US & Canada)">(GMT-05:00) Eastern Time (US & Canada)</option>
                  <option value="(GMT-04:00) Atlantic Time (Canada)">(GMT-04:00) Atlantic Time (Canada)</option>
                  <option value="(GMT-03:30) Newfoundland">(GMT-03:30) Newfoundland</option>
                  <option value="(GMT-03:00) Buenos Aires">(GMT-03:00) Buenos Aires</option>
                  <option value="(GMT-02:00) Mid-Atlantic">(GMT-02:00) Mid-Atlantic</option>
                  <option value="(GMT-01:00) Azores">(GMT-01:00) Azores</option>
                  <option value="(GMT+00:00) Greenwich Mean Time : London">(GMT+00:00) Greenwich Mean Time : London</option>
                  <option value="(GMT+01:00) Central European Time : Berlin">(GMT+01:00) Central European Time : Berlin</option>
                  <option value="(GMT+02:00) Eastern European Time : Cairo">(GMT+02:00) Eastern European Time : Cairo</option>
                  <option value="(GMT+03:00) Moscow">(GMT+03:00) Moscow</option>
                  <option value="(GMT+03:30) Tehran">(GMT+03:30) Tehran</option>
                  <option value="(GMT+04:00) Abu Dhabi, Muscat">(GMT+04:00) Abu Dhabi, Muscat</option>
                  <option value="(GMT+04:30) Kabul">(GMT+04:30) Kabul</option>
                  <option value="(GMT+05:00) Islamabad, Karachi">(GMT+05:00) Islamabad, Karachi</option>
                  <option value="(GMT+05:30) New Delhi, Mumbai, Kolkata (India)">(GMT+05:30) New Delhi, Mumbai, Kolkata (India)</option>
                  <option value="(GMT+05:45) Kathmandu">(GMT+05:45) Kathmandu</option>
                  <option value="(GMT+06:00) Almaty, Dhaka">(GMT+06:00) Almaty, Dhaka</option>
                  <option value="(GMT+06:30) Yangon (Rangoon)">(GMT+06:30) Yangon (Rangoon)</option>
                  <option value="(GMT+07:00) Bangkok, Hanoi, Jakarta">(GMT+07:00) Bangkok, Hanoi, Jakarta</option>
                  <option value="(GMT+08:00) Beijing, Perth, Singapore">(GMT+08:00) Beijing, Perth, Singapore</option>
                  <option value="(GMT+09:00) Tokyo, Seoul, Yakutsk">(GMT+09:00) Tokyo, Seoul, Yakutsk</option>
                  <option value="(GMT+09:30) Adelaide">(GMT+09:30) Adelaide</option>
                  <option value="(GMT+10:00) Eastern Australia, Vladivostok">(GMT+10:00) Eastern Australia, Vladivostok</option>
                  <option value="(GMT+11:00) Solomon Islands, Magadan">(GMT+11:00) Solomon Islands, Magadan</option>
                  <option value="(GMT+12:00) Auckland, Wellington">(GMT+12:00) Auckland, Wellington</option>
                </select>
              </div>
            </div>

            {/* Admin Profile Section */}
            <div className="pt-6 border-t border-gray-100">
              <h3 className="text-sm font-bold text-gray-900 mb-4">Admin Profile Settings</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-gray-900 mb-2">Admin Name</label>
                  <input 
                    type="text" 
                    value={settingsData.adminName}
                    onChange={(e) => setSettingsData({...settingsData, adminName: e.target.value})}
                    className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm font-semibold text-gray-900 outline-none focus:ring-2 focus:ring-blue-500/20 transition-all" 
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-900 mb-2">Admin Email</label>
                  <input 
                    type="email" 
                    value={settingsData.adminEmail}
                    onChange={(e) => setSettingsData({...settingsData, adminEmail: e.target.value})}
                    className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm font-semibold text-gray-900 outline-none focus:ring-2 focus:ring-blue-500/20 transition-all" 
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div>
                  <label className="block text-xs font-bold text-gray-900 mb-2">Admin Role</label>
                  <select 
                    value={settingsData.adminRole}
                    onChange={(e) => setSettingsData({...settingsData, adminRole: e.target.value})}
                    className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm font-semibold text-gray-900 outline-none focus:ring-2 focus:ring-blue-500/20 transition-all appearance-none cursor-pointer"
                  >
                    <option value="Super Admin">Super Admin</option>
                    <option value="Admin">Admin</option>
                    <option value="Visa Officer">Visa Officer</option>
                    <option value="Manager">Manager</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-900 mb-2">System Status</label>
                  <select 
                    value={settingsData.adminSystemStatus}
                    onChange={(e) => setSettingsData({...settingsData, adminSystemStatus: e.target.value})}
                    className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm font-semibold text-gray-900 outline-none focus:ring-2 focus:ring-blue-500/20 transition-all appearance-none cursor-pointer"
                  >
                    <option value="System Active">System Active</option>
                    <option value="Maintenance Mode">Maintenance Mode</option>
                    <option value="System Offline">System Offline</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div>
                  <label className="block text-xs font-bold text-gray-900 mb-2">Last Login</label>
                  <input 
                    type="text" 
                    value={settingsData.adminLastLogin}
                    onChange={(e) => setSettingsData({...settingsData, adminLastLogin: e.target.value})}
                    className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm font-semibold text-gray-900 outline-none focus:ring-2 focus:ring-blue-500/20 transition-all" 
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-900 mb-2">IP Address</label>
                  <input 
                    type="text" 
                    value={settingsData.adminIpAddress}
                    onChange={(e) => setSettingsData({...settingsData, adminIpAddress: e.target.value})}
                    className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm font-semibold text-gray-900 outline-none focus:ring-2 focus:ring-blue-500/20 transition-all" 
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Toggles & Theme */}
          <div className="space-y-8 bg-gray-50/50 p-6 rounded-2xl border border-gray-100">
            <div>
              <h3 className="text-sm font-bold text-gray-900 mb-6">Other Options</h3>
              <div className="space-y-5">
                {[
                  { id: "emailNotifications", label: "Email Notifications" },
                  { id: "statusChangeAlerts", label: "Status Change Alerts" },
                  { id: "newApplicationAlerts", label: "New Application Alerts" },
                  { id: "documentUploadAlerts", label: "Document Upload Alerts" }
                ].map((toggle) => (
                  <div key={toggle.id} className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-gray-700">{toggle.label}</span>
                    <button
                      onClick={() => setSettingsData({...settingsData, [toggle.id]: !settingsData[toggle.id]})}
                      className={`w-11 h-6 rounded-full relative transition-colors duration-200 ease-in-out focus:outline-none ${settingsData[toggle.id] ? 'bg-blue-600' : 'bg-gray-200'}`}
                    >
                      <span className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform duration-200 ease-in-out ${settingsData[toggle.id] ? 'transform translate-x-5' : ''}`} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-gray-200">
              <h3 className="text-sm font-bold text-gray-900 mb-4">Theme Mode</h3>
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => setSettingsData({...settingsData, themeMode: "Light"})}
                  className={`flex-1 py-2.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all ${settingsData.themeMode === "Light" ? "bg-blue-50 text-blue-600 border border-blue-200 shadow-sm" : "bg-white text-gray-500 border border-gray-200 hover:bg-gray-50"}`}
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                  Light
                </button>
                <button 
                  onClick={() => setSettingsData({...settingsData, themeMode: "Dark"})}
                  className={`flex-1 py-2.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all ${settingsData.themeMode === "Dark" ? "bg-gray-900 text-white shadow-sm" : "bg-white text-gray-500 border border-gray-200 hover:bg-gray-50"}`}
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
                  Dark
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50/50 flex overflow-hidden">
      {/* Global Animations */}
      <AnimatePresence>
        {isTabLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-white/70 backdrop-blur-md"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="relative w-24 h-24 flex items-center justify-center text-blue-600 drop-shadow-2xl"
            >
              {/* Outer spinning dash ring */}
              <div className="absolute inset-0 rounded-full border-4 border-dashed border-blue-600/30 animate-spin" style={{ animationDuration: "3s" }} />
              {/* Inner fast spinner */}
              <div className="absolute w-16 h-16 rounded-full border-4 border-t-blue-600 border-r-transparent border-b-transparent border-l-transparent animate-spin" />
              {/* Revolving flying airplane icon */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                className="absolute inset-0 flex items-start justify-center"
              >
                <FaPlane className="text-blue-600 text-xl transform -rotate-45 mt-[-10px]" />
              </motion.div>
              {/* Center spinning core */}
              <FaSpinner className="text-blue-600/40 text-2xl animate-spin" />
            </motion.div>
          </motion.div>
        )}

        {showApprovedStamp && (
          <motion.div
            initial={{ opacity: 0, scale: 4, rotate: -20 }}
            animate={{ opacity: 1, scale: 1, rotate: -10 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 150, damping: 15 }}
            className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-none"
          >
            <div className="border-[16px] border-red-600 rounded-3xl px-16 py-8 text-red-600 font-black text-7xl md:text-8xl tracking-widest uppercase opacity-80 mix-blend-multiply drop-shadow-2xl text-center transform shadow-red-500/50 shadow-2xl">
              PASSPORT<br/>APPROVED
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MOBILE NAV DRAWER */}
      <AnimatePresence>
        {mobileMenu && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[999] bg-black/50 backdrop-blur-sm lg:hidden"
          >
            <motion.div
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              className="w-[280px] h-full bg-white flex flex-col justify-between p-6 shadow-2xl"
            >
              <div>
                <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-6">
                  <div>
                    <h1 className="text-lg font-black text-gray-900 tracking-tight">HASSLE FREE</h1>
                    <p className="text-[10px] text-gray-400 font-bold uppercase">Visa Management System</p>
                  </div>
                  <button onClick={() => setMobileMenu(false)} className="text-gray-900 text-2xl">
                    <FaTimes />
                  </button>
                </div>

                <div className="space-y-1.5 overflow-y-auto max-h-[80vh]">
                  {sidebarItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => {
                        handleTabChange(item.id);
                        setMobileMenu(false);
                      }}
                      className={`w-full py-3 px-4 rounded-xl text-sm font-bold flex items-center gap-3 transition-all duration-200 ${
                        activeTab === item.id
                          ? "bg-blue-600 text-white shadow-md shadow-blue-500/15"
                          : "text-gray-500 hover:bg-gray-50"
                      }`}
                    >
                      <item.icon size={16} />
                      <span>{item.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Red logout button at bottom */}
              <button
                onClick={() => {
                  toast.success("Signed Out");
                  setMobileMenu(false);
                }}
                className="w-full py-3 px-4 rounded-xl text-sm font-bold flex items-center gap-3 transition-all duration-200 text-red-600 hover:bg-red-50"
              >
                <FaSignOutAlt size={16} />
                <span>Logout</span>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* DESKTOP SIDEBAR */}
      <aside className={`w-[300px] hidden lg:flex flex-col justify-between p-6 flex-shrink-0 border-r transition-all duration-300 ${
        settingsData.themeMode === "Dark" ? "bg-slate-900 border-slate-800 text-white" : "bg-white border-gray-100 text-gray-900"
      }`}>
        <div>
          {/* Logo Header */}
          <div className="pb-6 border-b border-gray-50 flex items-center gap-3">
            {settingsData.companyLogo && settingsData.companyLogo.startsWith("data:") ? (
              <img src={settingsData.companyLogo} alt="Logo" className="w-10 h-10 rounded-xl object-cover shrink-0" />
            ) : (
              <span className="text-3xl shrink-0">{settingsData.companyLogo || "🌐"}</span>
            )}
            <div>
              <h1 className="text-xl font-black tracking-tight flex items-center gap-1">
                <span className="text-blue-600">HASSLE</span>
                <span className={settingsData.themeMode === "Dark" ? "text-red-500" : "text-red-500"}>FREE</span>
              </h1>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mt-0.5">
                Visa Management System
              </p>
            </div>
          </div>

          {/* Sidebar Menu Items */}
          <div className="space-y-1.5 mt-8 max-h-[68vh] overflow-y-auto pr-1">
            {sidebarItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  handleTabChange(item.id);
                  // Reset status filters on click
                  if (item.id === "all_apps") setStatusFilter("All");
                }}
                className={`w-full py-3.5 px-4 rounded-xl text-base font-bold flex items-center gap-3 transition-all duration-200 ${
                  activeTab === item.id
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-600/15"
                    : settingsData.themeMode === "Dark"
                      ? "text-slate-400 hover:bg-slate-800 hover:text-white"
                      : "text-gray-500 hover:bg-gray-50 hover:text-gray-800"
                }`}
              >
                <item.icon size={20} className={activeTab === item.id ? "text-white" : settingsData.themeMode === "Dark" ? "text-slate-400" : "text-gray-400"} />
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* RED LOGOUT BUTTON */}
        <button
          onClick={() => {
            toast.success("Signed Out Successfully");
          }}
          className={`w-full py-3.5 px-4 rounded-xl text-base font-bold flex items-center gap-3 transition-all duration-200 border mt-8 ${
            settingsData.themeMode === "Dark"
              ? "text-red-400 hover:bg-red-950/20 border-transparent hover:border-red-900/50"
              : "text-red-600 hover:bg-red-50 border-transparent hover:border-red-100"
          }`}
        >
          <FaSignOutAlt size={20} className="text-red-500" />
          <span>Logout</span>
        </button>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* TOP BAR / HEADER */}
        <header className={`px-6 py-4 flex items-center justify-between flex-shrink-0 z-10 shadow-sm border-b transition-all duration-300 ${
          settingsData.themeMode === "Dark" ? "bg-slate-800 border-slate-700 text-white" : "bg-white border-gray-100 text-gray-900"
        }`}>
          {/* Mobile Menu trigger & Search */}
          <div className="flex items-center gap-4 flex-1">
            <button
              onClick={() => setMobileMenu(true)}
              className="lg:hidden w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-700 hover:bg-gray-100"
            >
              <FaBars />
            </button>

            {/* Global Search Bar Mockup */}
            <div className="relative max-w-md w-full hidden md:block">
              <FaSearch className="absolute top-1/2 -translate-y-1/2 left-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search by applicant name, ref no, passport..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-gray-50 border border-gray-100 rounded-2xl pl-11 pr-4 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
            </div>
          </div>

          {/* Right Action Icons & User profile */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowAddForm(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 transition-all duration-200"
            >
              <FaPlus size={12} /> Add Application
            </button>

            {/* Notifications Dropdown Trigger */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-500 hover:bg-gray-100 border border-gray-100 relative"
              >
                <FaBell />
                <span className="absolute top-1.5 right-1.5 bg-red-500 text-white text-[9px] font-bold w-4.5 h-4.5 rounded-full flex items-center justify-center border-2 border-white">
                  {notificationsList.length}
                </span>
              </button>

              <AnimatePresence>
                {showNotifications && (
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 15 }}
                    className="absolute right-0 mt-3 w-80 bg-white border border-gray-100 rounded-2xl shadow-xl p-4 z-[99]"
                  >
                    <div className="flex justify-between items-center mb-3">
                      <h4 className="font-bold text-gray-900 text-sm">Notifications</h4>
                      {notificationsList.length > 0 && (
                        <button 
                          onClick={() => setNotificationsList([])}
                          className="text-[10px] font-bold text-red-500 hover:underline"
                        >
                          Clear All
                        </button>
                      )}
                    </div>
                    <div className="space-y-1 max-h-[300px] overflow-y-auto">
                      {notificationsList.length === 0 ? (
                        <div className="p-4 text-center text-sm text-gray-500 font-semibold">No recent updates</div>
                      ) : (
                        notificationsList.map((notif) => (
                          <div 
                            key={notif.id} 
                            className="text-xs text-gray-700 bg-white hover:bg-blue-50 p-3 rounded-xl border border-transparent hover:border-blue-100 transition-colors flex gap-3 items-center justify-between group"
                          >
                            <div
                              onClick={() => { setShowNotifications(false); handleTabChange("all_apps"); }}
                              className="flex gap-3 items-start cursor-pointer flex-1"
                            >
                              <div className="mt-0.5 w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                                <FaBell size={10} />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="font-bold mb-1 leading-snug break-words text-gray-800">{notif.message}</p>
                                <p className="text-[10px] text-gray-400 font-semibold">{notif.time}</p>
                              </div>
                            </div>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setNotificationsList(prev => prev.filter(item => item.id !== notif.id));
                              }}
                              className="text-gray-300 hover:text-red-500 p-1.5 rounded transition-colors self-center opacity-0 group-hover:opacity-100 focus:opacity-100 shrink-0"
                              title="Delete notification"
                            >
                              <FaTrash size={10} />
                            </button>
                          </div>
                        ))
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* User Profile */}
            <div className="relative border-l border-gray-100 pl-4">
              <div
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center gap-3 cursor-pointer group"
              >
                <div className="relative w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-indigo-500 flex items-center justify-center text-white font-bold text-lg shadow-md group-hover:scale-105 transition-all">
                  {adminProfile.name?.charAt(0).toUpperCase() || "A"}
                  <span className={`absolute bottom-0 right-0 w-3 h-3 border-2 border-white rounded-full ${getStatusDotColor(adminProfile.systemStatus)}`}></span>
                </div>
                <div className="hidden sm:block">
                  <div className="text-xs font-bold text-gray-900 capitalize">{adminProfile.name}</div>
                  <div className="text-[10px] text-gray-400 font-semibold">{adminProfile.role}</div>
                </div>
              </div>

              {/* Dropdown Menu */}
              <AnimatePresence>
                {showProfileMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 mt-3 w-64 bg-white border border-gray-100 rounded-2xl shadow-xl z-50 overflow-hidden"
                  >
                    <div className="p-4 border-b border-gray-100 flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 to-indigo-500 flex items-center justify-center text-white font-bold text-xl shadow-md">
                        {adminProfile.name?.charAt(0).toUpperCase() || "A"}
                      </div>
                      <div>
                        <div className="font-bold text-gray-900 capitalize">{adminProfile.name}</div>
                        <div className="text-[10px] text-gray-400 font-semibold">{adminProfile.role}</div>
                        <div className="text-[10px] text-gray-400">{adminProfile.email}</div>
                      </div>
                    </div>
                    <div className="p-4 border-b border-gray-100 space-y-2 text-xs">
                      <div className="flex justify-between">
                        <span className="font-bold text-gray-700">Last Login</span>
                        <span className="text-gray-500 font-medium">{adminProfile.lastLogin}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-bold text-gray-700">IP Address</span>
                        <span className="text-gray-500 font-medium">{adminProfile.ipAddress}</span>
                      </div>
                      <div className="flex justify-between items-center mt-1">
                        <span className="font-bold text-gray-700">Status</span>
                        <span className="text-gray-500 font-medium flex items-center gap-1.5">
                          <span className={`w-2 h-2 rounded-full ${adminProfile.systemStatus.toLowerCase().includes("active") ? "bg-green-500" : "bg-red-500"}`}></span> 
                          {adminProfile.systemStatus}
                        </span>
                      </div>
                    </div>
                    <div className="p-2">
                      <button onClick={() => { handleTabChange("settings"); setShowProfileMenu(false); }} className="w-full text-left px-4 py-2.5 hover:bg-gray-50 rounded-xl text-sm font-semibold text-gray-700 flex items-center gap-3 transition-colors">
                        <FaUserCircle className="text-gray-400" /> My Profile
                      </button>
                      <button onClick={() => { handleTabChange("settings"); setShowProfileMenu(false); }} className="w-full text-left px-4 py-2.5 hover:bg-gray-50 rounded-xl text-sm font-semibold text-gray-700 flex items-center gap-3 transition-colors">
                        <FaCog className="text-gray-400" /> Settings
                      </button>
                      <button onClick={() => { setShowPasswordModal(true); setShowProfileMenu(false); }} className="w-full text-left px-4 py-2.5 hover:bg-gray-50 rounded-xl text-sm font-semibold text-gray-700 flex items-center gap-3 transition-colors">
                        <FaCheckCircle className="text-gray-400" /> Change Password
                      </button>
                      <button onClick={() => { localStorage.clear(); window.location.href = '/'; }} className="w-full text-left px-4 py-2.5 mt-1 hover:bg-red-50 rounded-xl text-sm font-bold text-red-600 flex items-center gap-3 transition-colors">
                        <FaSignOutAlt className="text-red-500" /> Logout
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </header>

        {/* PAGE CONTENT CONTAINER */}
        <div className={`flex-1 overflow-y-auto p-6 md:p-8 transition-all duration-300 ${
          settingsData.themeMode === "Dark" ? "bg-slate-950 text-slate-100" : "bg-[#F8FAFC] text-gray-900"
        }`}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.2 }}
            >
              {activeTab === "dashboard" && renderDashboard()}
              {activeTab === "all_apps" && renderAllApplications()}
              {activeTab === "individual_apps" && renderIndividualApplications()}
              {activeTab === "corporate_apps" && renderCorporateApplications()}
              {activeTab === "agent_apps" && renderAgentApplications()}
              {activeTab === "documents" && renderDocumentsReceived()}
              {activeTab === "pending" && renderPendingApplications()}
              {activeTab === "approved" && renderApprovedApplications()}
              {activeTab === "rejected" && renderRejectedApplications()}
              {activeTab === "tracking" && renderVisaTracking()}
              {activeTab === "reports" && renderReports()}
              {activeTab === "clients" && renderClients()}
              {activeTab === "settings" && renderSettings()}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* VIEW DETAILS MODAL */}
      <AnimatePresence>
        {selectedApplication && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[999] px-6"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white border border-gray-100 rounded-3xl p-8 w-full max-w-lg shadow-2xl overflow-hidden"
            >
              <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                <h3 className="text-xl font-bold text-gray-900">Application Details</h3>
                <button
                  onClick={() => setSelectedApplication(null)}
                  className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
                >
                  &times;
                </button>
              </div>

              <div className="mt-6 space-y-4 text-sm max-h-[60vh] overflow-y-auto pr-2">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-xs text-gray-400 font-bold uppercase">Ref ID</span>
                    <p className="font-bold text-gray-900 mt-0.5">{selectedApplication.id}</p>
                  </div>
                  <div>
                    <span className="text-xs text-gray-400 font-bold uppercase">Category</span>
                    <p className="font-bold text-blue-600 mt-0.5">{selectedApplication.category}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-xs text-gray-400 font-bold uppercase">Applicant Name</span>
                    <p className="font-bold text-gray-900 mt-0.5">{selectedApplication.name}</p>
                  </div>
                  <div>
                    <span className="text-xs text-gray-400 font-bold uppercase">Passport No</span>
                    <p className="font-bold text-gray-900 mt-0.5">{selectedApplication.passport}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-xs text-gray-400 font-bold uppercase">Country</span>
                    <p className="font-bold text-gray-900 mt-0.5">{selectedApplication.country}</p>
                  </div>
                  <div>
                    <span className="text-xs text-gray-400 font-bold uppercase">Visa Type</span>
                    <p className="font-bold text-gray-900 mt-0.5">{selectedApplication.visaType}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-xs text-gray-400 font-bold uppercase">Submitted On</span>
                    <p className="font-bold text-gray-900 mt-0.5">{selectedApplication.submittedOn}</p>
                  </div>
                  <div>
                    <span className="text-xs text-gray-400 font-bold uppercase">Travel Date</span>
                    <p className="font-bold text-gray-900 mt-0.5">{selectedApplication.travelDate}</p>
                  </div>
                </div>

                <div>
                  <span className="text-xs text-gray-400 font-bold uppercase">Documents Received</span>
                  <p className="font-bold text-blue-600 mt-0.5">{selectedApplication.docType}</p>
                </div>

                <div>
                  <span className="text-xs text-gray-400 font-bold uppercase">Verified By</span>
                  <p className="font-bold text-gray-900 mt-0.5">{selectedApplication.verifiedBy}</p>
                </div>

                <div>
                  <span className="text-xs text-gray-400 font-bold uppercase">Current Status / Remarks</span>
                  <p className="font-bold text-red-500 mt-0.5 bg-red-50 p-3 rounded-xl border border-red-100">{selectedApplication.pendingReason}</p>
                </div>
              </div>

              <div className="mt-8 flex justify-end gap-2 border-t border-gray-100 pt-4">
                <button
                  onClick={() => downloadApplication(selectedApplication)}
                  className="bg-blue-600 text-white font-bold px-6 py-2.5 rounded-xl hover:bg-blue-700 flex items-center gap-2"
                >
                  <FaDownload size={12} /> Download PDF
                </button>
                <button
                  onClick={() => setSelectedApplication(null)}
                  className="bg-gray-100 text-gray-700 font-bold px-6 py-2.5 rounded-xl hover:bg-gray-200"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ADD / EDIT APPLICATION MODAL */}
      <AnimatePresence>
        {showAddForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[999] px-6"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white border border-gray-100 rounded-3xl p-8 w-full max-w-xl shadow-2xl overflow-hidden"
            >
              <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                <h3 className="text-xl font-bold text-gray-900">
                  {editData ? "Edit Application" : "Add Visa Application"}
                </h3>
                <button
                  onClick={() => {
                    setShowAddForm(false);
                    setEditData(null);
                  }}
                  className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
                >
                  &times;
                </button>
              </div>

              <div className="mt-6 space-y-4 max-h-[60vh] overflow-y-auto pr-2">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-gray-400 uppercase">Applicant Name *</label>
                    <input
                      type="text"
                      placeholder="e.g. Arjun Kumar"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-2.5 mt-1 text-sm outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gray-400 uppercase">Passport No *</label>
                    <input
                      type="text"
                      placeholder="e.g. MZ4567821"
                      value={formData.passport}
                      onChange={(e) => setFormData({ ...formData, passport: e.target.value })}
                      className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-2.5 mt-1 text-sm outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-gray-400 uppercase">Target Country *</label>
                    <input
                      type="text"
                      placeholder="e.g. Canada"
                      value={formData.country}
                      onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                      className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-2.5 mt-1 text-sm outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gray-400 uppercase">Visa Type *</label>
                    <input
                      type="text"
                      placeholder="e.g. Tourist Visa"
                      value={formData.visaType}
                      onChange={(e) => setFormData({ ...formData, visaType: e.target.value })}
                      className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-2.5 mt-1 text-sm outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-gray-400 uppercase">Email</label>
                    <input
                      type="email"
                      placeholder="e.g. client@email.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-2.5 mt-1 text-sm outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gray-400 uppercase">Phone</label>
                    <input
                      type="text"
                      placeholder="e.g. +91 9876543210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-2.5 mt-1 text-sm outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-gray-400 uppercase">Travel Date</label>
                    <input
                      type="text"
                      placeholder="e.g. 12 Aug 2026"
                      value={formData.travelDate}
                      onChange={(e) => setFormData({ ...formData, travelDate: e.target.value })}
                      className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-2.5 mt-1 text-sm outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gray-400 uppercase">Documents Attached</label>
                    <input
                      type="text"
                      placeholder="e.g. Passport copy & ITR"
                      value={formData.docType}
                      onChange={(e) => setFormData({ ...formData, docType: e.target.value })}
                      className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-2.5 mt-1 text-sm outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-gray-400 uppercase">Application Status *</label>
                    <select
                      value={formData.status || "Pending"}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                      className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-2.5 mt-1 text-sm outline-none"
                    >
                      <option value="">-- Select Status --</option>
                      <option value="Pending">Pending</option>
                      <option value="Documents Received">Documents Received</option>
                      <option value="Under Review">Under Review</option>
                      <option value="Approved">Approved</option>
                      <option value="Rejected">Rejected</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gray-400 uppercase">Status Remarks / Pending Reasons</label>
                    <input
                      type="text"
                      placeholder="e.g. Awaiting Bank Statement Verification"
                      value={formData.pendingReason}
                      onChange={(e) => setFormData({ ...formData, pendingReason: e.target.value })}
                      className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-2.5 mt-1 text-sm outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-8 flex justify-end gap-2 border-t border-gray-100 pt-4">
                <button
                  onClick={handleAddApplication}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-2.5 rounded-xl text-sm"
                >
                  {editData ? "Update Details" : "Add Application"}
                </button>
                <button
                  onClick={() => {
                    setShowAddForm(false);
                    setEditData(null);
                  }}
                  className="bg-gray-100 text-gray-700 font-bold px-6 py-2.5 rounded-xl hover:bg-gray-200"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}

        {showPasswordModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9999] flex items-center justify-center p-4 animate-fade-in"
          >
            <motion.div
              initial={{ y: 20, scale: 0.95 }}
              animate={{ y: 0, scale: 1 }}
              exit={{ y: 20, scale: 0.95 }}
              className="bg-white border border-gray-100 rounded-3xl p-6 md:p-8 max-w-md w-full shadow-2xl relative"
            >
              <button
                onClick={() => setShowPasswordModal(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <FaTimes size={18} />
              </button>

              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <FaCheckCircle className="text-blue-600" /> Change Password
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Current Password</label>
                  <input
                    type="password"
                    value={passwordForm.currentPassword}
                    onChange={(e) => setPasswordForm({...passwordForm, currentPassword: e.target.value})}
                    placeholder="Enter current password"
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm font-semibold text-gray-900 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-2">New Password</label>
                  <input
                    type="password"
                    value={passwordForm.newPassword}
                    onChange={(e) => setPasswordForm({...passwordForm, newPassword: e.target.value})}
                    placeholder="Enter new password"
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm font-semibold text-gray-900 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Confirm New Password</label>
                  <input
                    type="password"
                    value={passwordForm.confirmPassword}
                    onChange={(e) => setPasswordForm({...passwordForm, confirmPassword: e.target.value})}
                    placeholder="Confirm new password"
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm font-semibold text-gray-900 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  />
                </div>
              </div>

              <div className="mt-8 flex justify-end gap-3 border-t border-gray-100 pt-4">
                <button
                  onClick={() => {
                    const currentStored = localStorage.getItem("adminPassword") || "admin123";
                    if (passwordForm.currentPassword !== currentStored) {
                      toast.error("Incorrect current password!");
                      return;
                    }
                    if (!passwordForm.newPassword) {
                      toast.error("Please enter a new password");
                      return;
                    }
                    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
                      toast.error("New passwords do not match!");
                      return;
                    }
                    localStorage.setItem("adminPassword", passwordForm.newPassword);
                    toast.success("Password changed successfully!");
                    setShowPasswordModal(false);
                    setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
                  }}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-2.5 rounded-xl text-sm transition-all"
                >
                  Save Password
                </button>
                <button
                  onClick={() => {
                    setShowPasswordModal(false);
                    setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
                  }}
                  className="bg-gray-100 text-gray-700 font-bold px-6 py-2.5 rounded-xl hover:bg-gray-200 transition-all"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default AdminDashboard;