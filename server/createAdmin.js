import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import Admin from "./models/Admin.js";

dotenv.config({ path: path.join(path.dirname(fileURLToPath(import.meta.url)), ".env") });

mongoose.connect(process.env.MONGO_URI)
.then(() => {

  console.log("MongoDB Connected");

});

const createAdmin = async () => {

  await Admin.deleteMany({ email: "admin@gmail.com" });

  const hashedPassword = await bcrypt.hash(
    "admin123",
    10
  );

  const admin = new Admin({

    email: "admin@gmail.com",

    password: hashedPassword

  });

  await admin.save();

  console.log("Admin Created");

  process.exit();

};

createAdmin();