import express from 'express';
import { authenticateToken } from '../middleware/auth.js';
import { saveInstagramPosts, getInstagramPosts } from '../controllers/instagram.controller.js';

const router = express.Router();

router.post('/save-posts', authenticateToken, saveInstagramPosts);
router.get('/posts', authenticateToken, getInstagramPosts);

export default router;
