import express from 'express';
import { getInstagramPosts, saveInstagramPosts } from '../controllers/instagram.controller.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

router.post('/save-posts', authenticate, saveInstagramPosts);
router.get('/posts', authenticate, getInstagramPosts);

export default router;
