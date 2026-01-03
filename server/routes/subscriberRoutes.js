import express from 'express';
import { subscribe, getAllSubscribers } from '../controllers/subscriberController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
    .post(subscribe)
    .get(protect, admin, getAllSubscribers);

export default router;
