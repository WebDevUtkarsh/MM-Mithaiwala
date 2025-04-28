import express from 'express';
import { authUser, getUserProfile, registerUser } from '../controllers/user.controller.js';
import { protect } from '../middlewares/auth.middleware.js';
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', authUser);

// Protected Routes
router.get('/profile', protect, getUserProfile)

export default router;