
import { ClerkExpressWithAuth } from '@clerk/clerk-sdk-node';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import mongoose from 'mongoose';

import connectDB from '../config/db.js';

// Generate JWT Token (for legacy auth compatibility)
export const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE || '30d'
    });
};

// Middleware to verify Clerk Token and Sync User to MongoDB
export const protect = async (req, res, next) => {
    try {
        // Ensure DB is connected
        if (mongoose.connection.readyState !== 1) {
            await connectDB();
        }

        // Check for Bearer token
        if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer ')) {
            console.log('Auth Failed: No token provided');
            return res.status(401).json({ success: false, message: 'Not authorized, no token' });
        }

        const token = req.headers.authorization.split(' ')[1];
        // console.log('Verifying token:', token.substring(0, 10) + '...');

        const { verifyToken } = await import('@clerk/clerk-sdk-node');

        // Verify token (claims)
        let claims;
        try {
            claims = await verifyToken(token, {
                secretKey: process.env.CLERK_SECRET_KEY
            });
        } catch (tokenError) {
            console.error('Token Verification Failed:', tokenError.message);
            // console.error('Full Token Error:', tokenError);
            return res.status(401).json({ success: false, message: 'Token verification failed: ' + tokenError.message });
        }


        // 2. Sync / Find User in MongoDB
        const clerkId = claims.sub;
        console.log('Token Verified. Clerk ID:', clerkId);

        // Bypassing Mongoose findOne due to potential crash/validation issue
        console.log('Searching MongoDB (Native) for user...');
        let userBuffer = null;
        try {
            userBuffer = await mongoose.connection.db.collection('users').findOne({ clerkId });
        } catch (dbError) {
            console.error('Native DB Find Error:', dbError);
        }

        let user = userBuffer;

        // If not found via Native, fallback to Mongoose creation logic (or lookup by email)
        if (!user) {
            console.log('User not found. JIT creation from token claims (minimal)...');
            // Use claims or placeholders. 
            // Note: email is unique and required.
            const email = claims.email || `${clerkId}@lumiere.com`;
            const name = claims.name || 'User';

            try {
                // Try to create directly
                user = await User.create({
                    name,
                    email,
                    clerkId,
                    password: 'jit-created',
                    role: 'user'
                });
            } catch (createError) {
                // If create fails (e.g. email exists?), try to find by email
                console.log('JIT Create failed, trying find by email...', createError.message);
                if (createError.code === 11000) { // Duplicate key
                    user = await User.findOne({ email });
                    if (user) {
                        user.clerkId = clerkId;
                        await user.save();
                    } else {
                        // Maybe clerkId duplicate?
                        user = await User.findOne({ clerkId });
                        // If still null, then error
                        if (!user) throw createError;
                    }
                } else {
                    throw createError;
                }
            }
        }

        console.log('Auth Success. User _id:', user ? user._id : 'null');
        req.user = user;
        next();

    } catch (error) {
        console.error('CRITICAL Auth Middleware Error:', error);
        res.status(401).json({ success: false, message: 'Not authorized: ' + error.message });
    }
};

export const admin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        res.status(403).json({
            success: false,
            message: 'Not authorized as an admin'
        });
    }
};
