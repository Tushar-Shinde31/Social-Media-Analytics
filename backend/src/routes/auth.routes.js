import express from "express";
import { registerUser, loginUser } from "../controllers/auth.controller.js";
import { authenticate } from "../middleware/auth.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/dashboard", authenticate, (req, res) => {
  res.json({ message: `Welcome user ${req.user.email}` });
});

export default router;
