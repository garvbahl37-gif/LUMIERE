import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';

// Route imports
import authRoutes from './routes/authRoutes.js';
import productRoutes from './routes/productRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import cartRoutes from './routes/cartRoutes.js';
import orderRoutes from './routes/orderRoutes.js';

// Load env vars
dotenv.config();

// Connect to database (Removed global call for Vercel)
// connectDB();

const app = express();

// Connect DB Middleware (Prevents cold start crashes)
// DB Connection middleware moved below health check

// Middleware
app.use(cors({
    origin: true, // Allow any origin temporarily for debugging
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.get('/', (req, res) => {
    res.send('API is running...');
});

// Connect DB Middleware (Moved here so Root health check works even if DB fails)
app.use(async (req, res, next) => {
    if (req.path === '/') return next(); // Double safety
    try {
        await connectDB();
    } catch (error) {
        console.error('DB Connection Error:', error);
    }
    next();
});

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);

// Health check
app.get('/api/health', (req, res) => {
    res.json({
        success: true,
        message: 'Aesthetic Emporium API is running',
        timestamp: new Date().toISOString()
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Route not found'
    });
});

// Error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: err.message || 'Server Error'
    });
});

process.on('unhandledRejection', (err) => {
    console.log('UNHANDLED REJECTION! 💥');
    console.log(err.name, err.message);
    console.log(err.stack);
    // process.exit(1); // Don't exit, just log for now to keep server alive
});

const PORT = process.env.PORT || 5000;

// Only listen if not running on Vercel (Vercel handles the serverless function export)
if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
    app.listen(PORT, () => {
        console.log(`
╔═══════════════════════════════════════════════════════╗
║                                                       ║
║   🌟 Aesthetic Emporium API Server                    ║
║                                                       ║
║   Server running in ${process.env.NODE_ENV || 'development'} mode              ║
║   Port: ${PORT}                                          ║
║   API: http://localhost:${PORT}/api                      ║
║                                                       ║
╚═══════════════════════════════════════════════════════╝
      `);
    });
}

export default app;
