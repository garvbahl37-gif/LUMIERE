import express from 'express';
import {
    getOrders,
    getOrder,
    createOrder,
    createOrderDirect,
    updateOrderStatus,
    updatePaymentStatus,
    getAllOrders,
    trackOrder
} from '../controllers/orderController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public routes (no authentication required)
router.get('/track/:id', trackOrder);
router.get('/admin/all', getAllOrders);

// Protected routes (require authentication)
router.use(protect);

router.get('/', getOrders);
router.post('/', createOrder);
router.post('/direct', createOrderDirect);
// router.get('/admin/all', admin, getAllOrders); // Moved to public for testing
router.get('/:id', getOrder);
router.put('/:id/pay', updatePaymentStatus);
router.put('/:id/status', admin, updateOrderStatus);

export default router;

