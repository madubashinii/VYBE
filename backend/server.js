// import express, { json } from "express";
// import cors from "cors";
// import dotenv from "dotenv";
// import mongoose from "mongoose";

// import authRoutes from "./routes/auth.js";
// import planRoutes from "./routes/plans.js";
// import progressRoutes from "./routes/progress.js";

// dotenv.config();

// const app = express();
// app.use(cors());
// app.use(json());

// // routes
// app.use("/api/auth", authRoutes);
// app.use("/api/plans", planRoutes);
// app.use("/api/progress", progressRoutes);

// // database
// mongoose
//     .connect(process.env.MONGO_URI)
//     .then(() => console.log("MongoDB Connected"))
//     .catch((err) => console.log(err));


// app.listen(process.env.PORT, () =>
//     console.log(`Server running on port ${process.env.PORT}`)
// );

import express, { json } from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

import authRoutes from "./routes/auth.js";
import planRoutes from "./routes/plans.js";
import progressRoutes from "./routes/progress.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/plans", planRoutes);
app.use("/api/progress", progressRoutes);

// Connect to MongoDB
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.log(err));

// Export as serverless handler for Vercel
export default app;
