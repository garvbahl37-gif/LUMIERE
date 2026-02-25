import express from 'express';
import {
    getProducts,
    getFeaturedProducts,
    getNewArrivals,
    getProduct,
    getProductBySlug,
    searchProducts,
    createProduct,
    updateProduct,
    deleteProduct
} from '../controllers/productController.js';
import { protect, admin } from '../middleware/authMiddleware.js';
import { cacheMiddleware } from '../middleware/redisMiddleware.js';

const router = express.Router();

// Public routes (Cached for 1 hour = 3600 seconds)
router.get('/', cacheMiddleware(3600), getProducts);
router.get('/featured', cacheMiddleware(3600), getFeaturedProducts);
router.get('/new', cacheMiddleware(3600), getNewArrivals);
router.get('/search', cacheMiddleware(3600), searchProducts);
router.get('/slug/:slug', cacheMiddleware(3600), getProductBySlug);
router.get('/:id', cacheMiddleware(3600), getProduct);

// Admin routes
router.post('/', protect, admin, createProduct);
router.put('/:id', protect, admin, updateProduct);
router.delete('/:id', protect, admin, deleteProduct);

export default router;
