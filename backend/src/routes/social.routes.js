import express from "express";
import { connectSocialAccount, getConnectedAccounts, getInstagramPosts } from "../controllers/social.controller.js";
import { authenticate } from "../middleware/auth.js";


const router = express.Router();

router.post("/connect", authenticate, connectSocialAccount);
router.get("/status", authenticate, getConnectedAccounts);
router.get("/instagram/posts", authenticate, getInstagramPosts);
export default router;
