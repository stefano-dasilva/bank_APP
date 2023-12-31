import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { authRoutes } from "../src/routes/authRoutes.js";
import { accountRoutes } from "../src/routes/accountRoutes.js";
import { transitionRoutes } from "../src/routes/transitionRoutes.js";
import cookieParser from "cookie-parser";
import dotenv from 'dotenv'
dotenv.config();

const app = express();

app.use(express.json());
app.use(cors({credentials : true, origin : "http://localhost:3000"}));
app.use(cookieParser())
app.use("/auth", authRoutes);
app.use("/account", accountRoutes);
app.use("/transition", transitionRoutes);

mongoose.connect(
  process.env.MONGO_URL
);
const PORT = 3001;

app.listen(PORT, () => console.log("Listening..."));
