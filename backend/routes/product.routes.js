import express from 'express';
import { createProduct, getProducts } from '../controllers/product.controller.js';
import { admin, protect } from '../middlewares/auth.middleware.js';
const router = express.Router();

router.get('/', getProducts);
router.post('/', protect, admin, createProduct)

export default router;