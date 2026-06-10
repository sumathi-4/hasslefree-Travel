import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import Admin from "../models/Admin.js";
import Application from "../models/Application.js";

const router = express.Router();

// Email helper function with SMTP fallback / stability built-in
const sendApplicationEmail = async (appData) => {
  const { email, name, id, country, status, visaType, passport, travelDate, docType, pendingReason } = appData;

  if (!email) {
    console.log("No email provided for notification");
    return;
  }

  // Validate email fields
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    console.log(`Skipping invalid email format: ${email}`);
    return;
  }

  const user = process.env.EMAIL_USER;
  const pass = process.env.EMAIL_PASS;

  const isMock = !user || !pass || user.includes("your-email@gmail.com") || pass.includes("your-email-app-password");

  let statusBg = "#FEF3C7";
  let statusColor = "#D97706";
  if (status === "Approved") {
    statusBg = "#D1FAE5";
    statusColor = "#059669";
  } else if (status === "Rejected") {
    statusBg = "#FEE2E2";
    statusColor = "#DC2626";
  } else if (status === "Under Review") {
    statusBg = "#F3E8FF";
    statusColor = "#7C3AED";
  } else if (status === "Documents Received") {
    statusBg = "#DBEAFE";
    statusColor = "#2563EB";
  }

  const remarks = pendingReason || "None";

  const htmlContent = `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #F8FAFC; padding: 40px 20px; color: #1E293B;">
      <div style="max-width: 600px; margin: 0 auto; background-color: #FFFFFF; border-radius: 24px; overflow: hidden; box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05); border: 1px solid #E2E8F0;">
        
        <!-- Header -->
        <div style="background-color: #FFFFFF; padding: 30px; border-bottom: 1px solid #F1F5F9; text-align: center;">
          <h1 style="margin: 0; font-size: 28px; font-weight: 900; letter-spacing: -0.5px;">
            <span style="color: #2563EB;">HASSLE</span><span style="color: #EF4444;">FREE</span>
          </h1>
          <p style="margin: 5px 0 0 0; color: #64748B; font-size: 14px; font-weight: 500;">Visa Management System</p>
        </div>

        <!-- Content -->
        <div style="padding: 40px 35px;">
          <h2 style="margin-top: 0; font-size: 22px; font-weight: 700; color: #0F172A;">Hello ${name},</h2>
          <p style="font-size: 16px; line-height: 1.6; color: #475569;">
            The status of your visa application for <strong>${country}</strong> has been updated.
          </p>

          <!-- Status Badge -->
          <div style="margin: 30px 0; text-align: center;">
            <span style="display: inline-block; background-color: ${statusBg}; color: ${statusColor}; font-size: 16px; font-weight: 700; padding: 12px 30px; border-radius: 9999px; text-transform: uppercase; letter-spacing: 1px; border: 1px solid rgba(0,0,0,0.05);">
              ${status}
            </span>
          </div>

          <!-- Application Details -->
          <div style="background-color: #F8FAFC; border-radius: 16px; padding: 25px; border: 1px solid #F1F5F9;">
            <h3 style="margin-top: 0; margin-bottom: 15px; font-size: 15px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; color: #64748B;">Application Details</h3>
            
            <table style="width: 100%; font-size: 15px; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; color: #64748B; width: 40%;">Application ID:</td>
                <td style="padding: 8px 0; color: #0F172A; font-weight: 600;">${id}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #64748B;">Applicant Name:</td>
                <td style="padding: 8px 0; color: #0F172A; font-weight: 600;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #64748B;">Passport No:</td>
                <td style="padding: 8px 0; color: #0F172A; font-weight: 600;">${passport || "N/A"}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #64748B;">Destination:</td>
                <td style="padding: 8px 0; color: #0F172A; font-weight: 600;">${country}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #64748B;">Visa Type:</td>
                <td style="padding: 8px 0; color: #0F172A; font-weight: 600;">${visaType}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #64748B;">Travel Date:</td>
                <td style="padding: 8px 0; color: #0F172A; font-weight: 600;">${travelDate || "N/A"}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #64748B;">Documents Attached:</td>
                <td style="padding: 8px 0; color: #0F172A; font-weight: 600;">${docType || "N/A"}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #64748B;">Remarks / Updates:</td>
                <td style="padding: 8px 0; color: #DC2626; font-weight: 600; font-style: italic;">${remarks}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #64748B;">Last Updated:</td>
                <td style="padding: 8px 0; color: #0F172A; font-weight: 600;">${new Date().toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}</td>
              </tr>
            </table>
          </div>

          <p style="font-size: 14px; line-height: 1.6; color: #64748B; margin-top: 30px; text-align: center;">
            If you have any questions or require further assistance, please feel free to contact our support team.
          </p>
        </div>

        <!-- Footer -->
        <div style="background-color: #F8FAFC; padding: 25px; border-top: 1px solid #E2E8F0; text-align: center; font-size: 12px; color: #94A3B8;">
          <p style="margin: 0;">&copy; ${new Date().getFullYear()} Hasslefree Travel. All rights reserved.</p>
          <p style="margin: 5px 0 0 0;">This is an automated notification. Please do not reply directly to this email.</p>
        </div>

      </div>
    </div>
  `;

  if (isMock) {
    try {
      const testAccount = await nodemailer.createTestAccount();
      const testTransporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false,
        auth: {
          user: testAccount.user,
          pass: testAccount.pass,
        },
      });

      const mailOptions = {
        from: `"Hasslefree Travel" <${testAccount.user}>`,
        to: email,
        subject: `Visa Application Status: ${status} [${id}]`,
        html: htmlContent,
      };

      const info = await testTransporter.sendMail(mailOptions);
      const previewUrl = nodemailer.getTestMessageUrl(info);
      console.log("------------------- ETHEREAL MOCK EMAIL INBOX -------------------");
      console.log(`To: ${email}`);
      console.log(`Subject: Visa Application Notification: ${status} [${id}]`);
      console.log(`Preview Inbox URL: ${previewUrl}`);
      console.log("-----------------------------------------------------------------");
    } catch (etherealErr) {
      console.error("Failed to create Ethereal test mail:", etherealErr.message);
    }
    return;
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: user,
        pass: pass,
      },
    });

    const mailOptions = {
      from: `"Hasslefree Travel" <${user}>`,
      to: email,
      subject: `Visa Application Status: ${status} [${id}]`,
      html: htmlContent,
    };

    await transporter.sendMail(mailOptions);
    console.log(`Email successfully sent to ${email}`);
  } catch (error) {
    // If real SMTP fails, log to console but don't break/crash
    console.error("Nodemailer transporter failed. Printing email details to logs instead:", error.message);
  }
};

const defaultApplications = [
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
    priority: true,
    category: "Individuals"
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
    priority: false,
    category: "Individuals"
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
    priority: false,
    category: "Individuals"
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
    priority: true,
    category: "Individuals"
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
    priority: false,
    category: "Individuals"
  },
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
    priority: true,
    category: "Corporate"
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
    priority: true,
    category: "Corporate"
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
    priority: false,
    category: "Corporate"
  },
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
    priority: true,
    category: "Agents"
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
    priority: false,
    category: "Agents"
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
    priority: false,
    category: "Agents"
  }
];

// Login endpoint
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(401).json({
        success: false,
        message: "Admin Not Found"
      });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid Password"
      });
    }

    const token = jwt.sign(
      { id: admin._id, role: "admin" },
      process.env.JWT_SECRET || "hasslefree_secret_key",
      { expiresIn: "7d" }
    );

    res.json({
      success: true,
      token,
      role: "admin",
      message: "Login Success"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error"
    });
  }
});

// GET all applications & Seed if empty
router.get("/applications", async (req, res) => {
  try {
    let apps = await Application.find({});
    if (apps.length === 0) {
      console.log("No applications found in MongoDB. Seeding initial mock data...");
      await Application.insertMany(defaultApplications);
      apps = await Application.find({});
    }
    res.json({ success: true, applications: apps });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching applications", error: error.message });
  }
});

// POST create application with validations
router.post("/applications", async (req, res) => {
  try {
    const { name, category, country, visaType, passport, email, status } = req.body;

    // Validate fields
    if (!name || !category || !country || !visaType || !passport || !email) {
      return res.status(400).json({ success: false, message: "Required fields (Name, Category, Country, Visa Type, Passport, Email) are missing" });
    }

    const validCategories = ["Individuals", "Corporate", "Agents"];
    if (!validCategories.includes(category)) {
      return res.status(400).json({ success: false, message: "Invalid Category selection" });
    }

    const validStatuses = ["Pending", "Documents Received", "Under Review", "Approved", "Rejected"];
    if (status && !validStatuses.includes(status)) {
      return res.status(400).json({ success: false, message: "Invalid Status selection" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ success: false, message: "Invalid email format" });
    }

    const newApp = new Application({
      ...req.body,
      id: req.body.id || `APP${Math.floor(Math.random() * 9000 + 1000)}`,
      status: status || "Pending",
      submittedOn: req.body.submittedOn || new Date().toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }),
      updatedOn: new Date().toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }),
    });

    await newApp.save();

    // Auto send email notification
    await sendApplicationEmail(newApp);

    res.status(201).json({ success: true, application: newApp });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error creating application", error: error.message });
  }
});

// PUT update application with validations
router.put("/applications/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, category, country, visaType, passport, email, status } = req.body;

    // Validate fields
    if (!name || !category || !country || !visaType || !passport || !email) {
      return res.status(400).json({ success: false, message: "Required fields are missing" });
    }

    const validCategories = ["Individuals", "Corporate", "Agents"];
    if (!validCategories.includes(category)) {
      return res.status(400).json({ success: false, message: "Invalid Category selection" });
    }

    const validStatuses = ["Pending", "Documents Received", "Under Review", "Approved", "Rejected"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ success: false, message: "Invalid Status selection" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ success: false, message: "Invalid email format" });
    }

    const updateData = {
      ...req.body,
      updatedOn: new Date().toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })
    };

    // Find original application to check if status or remarks changed
    const originalApp = await Application.findOne({ id });
    if (!originalApp) {
      return res.status(404).json({ success: false, message: "Application not found" });
    }

    const updatedApp = await Application.findOneAndUpdate({ id }, updateData, { new: true });

    // Send email automatically on updates
    await sendApplicationEmail(updatedApp);

    res.json({ success: true, application: updatedApp });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error updating application", error: error.message });
  }
});

// DELETE application
router.delete("/applications/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Application.findOneAndDelete({ id });

    if (!deleted) {
      return res.status(404).json({ success: false, message: "Application not found" });
    }

    res.json({ success: true, message: "Application deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error deleting application", error: error.message });
  }
});

// GET track visa status by application ID and passport
router.get("/track-visa", async (req, res) => {
  try {
    const { id, passport } = req.query;
    if (!id || !passport) {
      return res.status(400).json({
        success: false,
        message: "Application ID and Passport Number are required"
      });
    }

    // Seed mock data if database is empty to prevent lookup failure
    const count = await Application.countDocuments({});
    if (count === 0) {
      console.log("Seeding initial mock data from track-visa route...");
      await Application.insertMany(defaultApplications);
    }

    const application = await Application.findOne({ 
      id: { $regex: new RegExp(`^${id.trim()}$`, "i") }, 
      passport: { $regex: new RegExp(`^${passport.trim()}$`, "i") } 
    });
    if (!application) {
      return res.status(404).json({
        success: false,
        message: "No application found matching these details"
      });
    }

    res.json({
      success: true,
      application
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message
    });
  }
});

export default router;