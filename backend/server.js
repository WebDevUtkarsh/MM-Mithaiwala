import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import { connectRedis } from "./config/redis.js";
import connectDB from "./config/db.js";
import userRoute from "./routes/user.routes.js"

dotenv.config();

// Connect Database and Redis
connectDB();
connectRedis();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

app.use('/api/users', userRoute)

app.get("/", (req, res) => {
  res.send("Sweets & Snacks Store Backend Running...");
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
