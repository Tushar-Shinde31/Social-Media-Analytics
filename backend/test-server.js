import express from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Test route
app.get("/test", (req, res) => {
  res.json({ message: "Backend server is working!" });
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`✅ Test server running on port ${PORT}`);
  console.log(`🌐 Test endpoint: http://localhost:${PORT}/test`);
}); 