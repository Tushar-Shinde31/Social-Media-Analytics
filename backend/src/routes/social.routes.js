import express from "express";
import { authenticateToken } from "../middleware/auth.js";
import { connectSocialAccount, getConnectedAccounts, getInstagramPosts } from "../controllers/social.controller.js";

const router = express.Router();

router.post("/connect", authenticateToken, connectSocialAccount);
router.get("/status", authenticateToken, getConnectedAccounts);
router.get("/instagram/posts", authenticateToken, getInstagramPosts);

export default router;
