import express from "express";
import dotenv from "dotenv";
import { pool } from "./config/db.js";
import authRoutes from "./routes/auth.routes.js";
import cors from "cors";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
