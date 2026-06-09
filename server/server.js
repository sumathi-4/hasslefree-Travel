import express from "express";

import mongoose from "mongoose";

import cors from "cors";

import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

import adminRoutes from "./routes/adminRoutes.js";

dotenv.config({ path: path.join(path.dirname(fileURLToPath(import.meta.url)), ".env") });

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api/admin",adminRoutes);

mongoose.connect(process.env.MONGO_URI)
.then(()=>{

  console.log("MongoDB Connected");

})
.catch((error)=>{

  console.log("MongoDB Error:", error);

});

app.get("/",(req,res)=>{

  res.send("Server Running");

});

const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>{

  console.log(`Server Running on ${PORT}`);

});