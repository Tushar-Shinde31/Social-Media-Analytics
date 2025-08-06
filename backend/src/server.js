import express from "express";
import dotenv from "dotenv";
import { pool } from "./config/db.js";
import authRoutes from "./routes/auth.routes.js";
import cors from "cors";
import socialRoutes from "./routes/social.routes.js";
import instagramRoutes from "./routes/instagram.routes.js";
import twitterRoutes from "./routes/twitter.routes.js";
import youtubeRoutes from "./routes/youtube.routes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/social", socialRoutes);
app.use("/api/instagram", instagramRoutes);
app.use("/api/twitter", twitterRoutes);
app.use("/api/youtube", youtubeRoutes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
