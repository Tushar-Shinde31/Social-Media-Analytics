import express from "express";
import { authenticateToken } from "../middleware/auth.js";
import { registerUser, loginUser } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/dashboard", authenticateToken, (req, res) => {
  res.json({ message: "Dashboard accessed successfully" });
});

export default router;
