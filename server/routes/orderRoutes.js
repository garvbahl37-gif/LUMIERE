import express from 'express';
import {
    getOrders,
    getOrder,
    createOrder,
    updateOrderStatus,
    updatePaymentStatus,
    getAllOrders,
    trackOrder
} from '../controllers/orderController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public routes (no authentication required)
router.get('/track/:id', trackOrder);

// Protected routes (require authentication)
router.use(protect);

router.get('/', getOrders);
router.post('/', createOrder);
router.get('/admin/all', admin, getAllOrders);
router.get('/:id', getOrder);
router.put('/:id/pay', updatePaymentStatus);
router.put('/:id/status', admin, updateOrderStatus);

export default router;

