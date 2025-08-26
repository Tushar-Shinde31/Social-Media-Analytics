import express from 'express';
import { getInstagramPosts, saveInstagramPosts } from '../controllers/instagram.controller.js';
import { authenticate } from '../middleware/auth.js';
import { startInstagramAuth, instagramAuthCallback } from '../controllers/instagramAuth.controller.js';
import { syncInstagram } from '../controllers/instagramSync.controller.js';

const router = express.Router();

router.post('/save-posts', authenticate, saveInstagramPosts);
router.get('/posts', authenticate, getInstagramPosts);
router.get('/auth/start', authenticate, startInstagramAuth);
router.get('/auth/callback', instagramAuthCallback);
router.post('/sync', authenticate, syncInstagram);

export default router;
