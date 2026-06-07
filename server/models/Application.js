import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  category: { type: String, required: true, enum: ["Individuals", "Corporate", "Agents"] },
  name: { type: String, required: true },
  country: { type: String, required: true },
  visaType: { type: String, required: true },
  passport: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  travelDate: { type: String },
  submittedOn: { type: String },
  docType: { type: String },
  receivedOn: { type: String },
  verifiedBy: { type: String },
  pendingReason: { type: String },
  updatedOn: { type: String },
  priority: { type: Boolean, default: false },
  status: { type: String, required: true, enum: ["Pending", "Documents Received", "Under Review", "Approved", "Rejected"], default: "Pending" },
  companyName: { type: String },
  contactPerson: { type: String },
  agentName: { type: String },
  agencyName: { type: String },
  remarks: { type: String }
}, {
  timestamps: true
});

const Application = mongoose.model("Application", applicationSchema);
export default Application;
