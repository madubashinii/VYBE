import express, { json } from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "../lib/db.js";

import authRoutes from "../routes/auth.js";
import adminRoutes from "../routes/admin.js";
import planRoutes from "../routes/plans.js";
import progressRoutes from "../routes/progress.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(json());

app.get("/health", (req, res) => res.json({ ok: true, time: Date.now() }));

app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/plans", planRoutes);
app.use("/api/progress", progressRoutes);

if (!process.env.MONGO_URI) {
    console.warn("Warning: MONGO_URI not set. Database connection will fail until configured.");
}
if (!process.env.JWT_SECRET) {
    console.warn("Warning: JWT_SECRET not set. Authentication will be insecure or fail.");
}

await connectDB();

app.use((err, req, res, next) => {
    console.error("Unhandled error:", err);
    res.status(err.status || 500).json({ message: err.message || "Server error" });
});

export default app;
