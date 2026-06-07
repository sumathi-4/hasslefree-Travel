import mongoose from "mongoose";

import bcrypt from "bcryptjs";

import dotenv from "dotenv";

import Admin from "./models/Admin.js";

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
.then(() => {

  console.log("MongoDB Connected");

});

const createAdmin = async () => {

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