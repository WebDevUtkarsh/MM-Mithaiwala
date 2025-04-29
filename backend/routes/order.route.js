import express from 'express';
import { protect } from '../middlewares/auth.middleware.js';
import { placeOrder } from '../controllers/order.controllers.js';
const router = express.Router();

router.post('/', protect, placeOrder);

export default router;