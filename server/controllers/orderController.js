import mongoose from 'mongoose';
import Order from '../models/Order.js';
import Cart from '../models/Cart.js';
import Product from '../models/Product.js';

// @desc    Track order publicly (no auth required)
// @route   GET /api/orders/track/:id
// @access  Public
export const trackOrder = async (req, res) => {
    try {
        const searchId = req.params.id.trim();

        // Try to find by MongoDB _id, orderNumber, or partial match
        let order = null;

        // Check if it's a valid MongoDB ObjectId format
        if (searchId.match(/^[0-9a-fA-F]{24}$/)) {
            order = await Order.findById(searchId).select('-user -notes');
        }

        // If not found, try orderNumber
        if (!order) {
            order = await Order.findOne({ orderNumber: searchId.toUpperCase() }).select('-user -notes');
        }

        // If still not found, try partial _id match (last 8 characters)
        if (!order && searchId.length >= 6) {
            order = await Order.findOne({
                $or: [
                    { _id: { $regex: searchId + '$', $options: 'i' } },
                    { orderNumber: { $regex: searchId, $options: 'i' } }
                ]
            }).select('-user -notes');
        }

        if (!order) {
            return res.status(404).json({
                success: false,
                message: 'Order not found. Please check the order ID and try again.'
            });
        }

        res.json({
            success: true,
            data: order
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Get user orders
// @route   GET /api/orders
// @access  Private
export const getOrders = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
        res.json({
            success: true,
            data: orders
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Get single order
// @route   GET /api/orders/:id
// @access  Private
export const getOrder = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);

        if (!order) {
            return res.status(404).json({
                success: false,
                message: 'Order not found'
            });
        }

        // Make sure user owns order
        if (order.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to access this order'
            });
        }

        res.json({
            success: true,
            data: order
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// @desc    Create order
// @route   POST /api/orders
// @access  Private
export const createOrder = async (req, res) => {
    try {
        const { shippingAddress, paymentMethod } = req.body;

        // Get user's cart
        const cart = await Cart.findOne({ user: req.user._id });
        if (!cart || cart.items.length === 0) {
            return res.status(400).json({
                success: false,
                message: 'Cart is empty'
            });
        }

        // Verify stock for all items
        for (const item of cart.items) {
            const product = await Product.findById(item.product);
            if (!product || product.stock < item.quantity) {
                return res.status(400).json({
                    success: false,
                    message: `Insufficient stock for ${item.name}`
                });
            }
        }

        // Calculate prices
        const itemsPrice = cart.totalPrice;
        const shippingPrice = itemsPrice > 100 ? 0 : 10;
        const taxPrice = Number((0.1 * itemsPrice).toFixed(2));
        const totalPrice = Number((itemsPrice + shippingPrice + taxPrice).toFixed(2));

        // Create order
        const order = await Order.create({
            user: req.user._id,
            items: cart.items,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            shippingPrice,
            taxPrice,
            totalPrice
        });

        // Update product stock
        for (const item of cart.items) {
            await Product.findByIdAndUpdate(item.product, {
                $inc: { stock: -item.quantity }
            });
        }

        // Clear cart
        cart.items = [];
        await cart.save();

        res.status(201).json({
            success: true,
            data: order
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Create order directly with items (for frontend cart)
// @route   POST /api/orders/direct
// @access  Private
export const createOrderDirect = async (req, res) => {
    try {
        const { items, shippingAddress, paymentMethod, itemsPrice, shippingPrice, taxPrice, totalPrice } = req.body;

        if (!items || items.length === 0) {
            return res.status(400).json({
                success: false,
                message: 'No items provided'
            });
        }

        // Format items for order schema - product ID may be optional for local mock products
        const orderItems = items.map(item => {
            // Check if product ID is a valid MongoDB ObjectId
            const isValidObjectId = (id) => /^[0-9a-fA-F]{24}$/.test(id);
            const productId = (item._id && isValidObjectId(item._id)) ? item._id :
                (item.product && isValidObjectId(item.product)) ? item.product :
                    new mongoose.Types.ObjectId(); // Generate valid ID for mock products

            return {
                product: productId,
                name: item.name || 'Unknown Product',
                image: item.image || 'https://via.placeholder.com/150',
                price: Number(item.price) || 0,
                quantity: Number(item.quantity) || 1
            };
        });

        // Create order
        const order = await Order.create({
            user: req.user._id,
            items: orderItems,
            shippingAddress: {
                fullName: shippingAddress.fullName,
                street: shippingAddress.street,
                city: shippingAddress.city,
                state: shippingAddress.state,
                zipCode: shippingAddress.zipCode,
                country: shippingAddress.country,
                phone: shippingAddress.phone
            },
            paymentMethod: paymentMethod || 'card',
            paymentStatus: 'paid',
            itemsPrice: itemsPrice || 0,
            shippingPrice: shippingPrice || 0,
            taxPrice: taxPrice || 0,
            totalPrice: totalPrice || 0,
            status: 'processing',
            paidAt: new Date()
        });

        res.status(201).json({
            success: true,
            data: order
        });
    } catch (error) {
        console.error('Create order error details:', error);
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(val => val.message);
            console.error('Validation messages:', messages);
        }
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Update order status (Admin)
// @route   PUT /api/orders/:id/status
// @access  Private/Admin
export const updateOrderStatus = async (req, res) => {
    try {
        const { status, trackingNumber } = req.body;

        const order = await Order.findById(req.params.id);
        if (!order) {
            return res.status(404).json({
                success: false,
                message: 'Order not found'
            });
        }

        order.status = status;
        if (trackingNumber) {
            order.trackingNumber = trackingNumber;
        }
        if (status === 'delivered') {
            order.deliveredAt = Date.now();
        }

        await order.save();

        res.json({
            success: true,
            data: order
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Update payment status
// @route   PUT /api/orders/:id/pay
// @access  Private
export const updatePaymentStatus = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);

        if (!order) {
            return res.status(404).json({
                success: false,
                message: 'Order not found'
            });
        }

        order.paymentStatus = 'paid';
        order.paidAt = Date.now();
        order.status = 'processing';

        await order.save();

        res.json({
            success: true,
            data: order
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Get all orders (Admin)
// @route   GET /api/orders/admin/all
// @access  Private/Admin
export const getAllOrders = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 20;
        const skip = (page - 1) * limit;

        const total = await Order.countDocuments();
        const orders = await Order.find()
            .populate('user', 'name email')
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        res.json({
            success: true,
            data: orders,
            pagination: {
                page,
                limit,
                total,
                pages: Math.ceil(total / limit)
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
