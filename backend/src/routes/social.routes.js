import express from "express";
import { connectSocialAccount, getConnectedAccounts } from "../controllers/social.controller.js";
import { authenticate } from "../middleware/auth.js"; // JWT middleware


const router = express.Router();

// POST /api/social/connect
router.post("/connect", authenticate, connectSocialAccount);
router.get("/status", authenticate, getConnectedAccounts);
export default router;
