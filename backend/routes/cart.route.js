import express from 'express';
import { addToCart, getCart, removeFromCart } from '../controllers/cart.controller.js';
import { protect } from '../middlewares/auth.middleware.js';
const router = express.Router();

router.get('/', protect, getCart);
router.post('/', protect, addToCart);
router.post('/:productId/:variatnName', protect, removeFromCart);

export default router;