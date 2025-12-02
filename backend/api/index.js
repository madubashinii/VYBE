import express, { json } from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "../lib/db.js";

import authRoutes from "../routes/auth.js";
import planRoutes from "../routes/plans.js";
import progressRoutes from "../routes/progress.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(json());

app.use("/api/auth", authRoutes);
app.use("/api/plans", planRoutes);
app.use("/api/progress", progressRoutes);

// Connect to MongoDB once
await connectDB();

export default app;
