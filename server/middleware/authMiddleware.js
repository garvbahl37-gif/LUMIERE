
import { ClerkExpressWithAuth } from '@clerk/clerk-sdk-node';
import User from '../models/User.js';

// Middleware to verify Clerk Token and Sync User to MongoDB
export const protect = async (req, res, next) => {
    // 1. Verify Token with Clerk
    // ClerkExpressWithAuth middleware attaches 'auth' object to req
    // We wrap it in a promise to handle it cleanly here or use it as standard middleware

    // However, since we want to mix verification with User Syncing, let's do it manually using the clerk client
    // OR easier: assume this middleware is placed AFTER ClerkExpressWithAuth in the route definition?
    // No, let's make this standalone.

    // Actually, simplest way with ESM:
    try {
        // Check for Bearer token
        if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer ')) {
            return res.status(401).json({ success: false, message: 'Not authorized, no token' });
        }

        const token = req.headers.authorization.split(' ')[1];

        // Verify using Clerk (We need the Secret Key for this, usually CLERK_SECRET_KEY in env)
        // Note: For backend verification we need CLERK_SECRET_KEY.
        // If the user hasn't added it to Vercel Backend Env, this will fail.

        // Let's use the 'ClerkExpressWithAuth' compatible approach if possible, 
        // but that requires 'req' to be processed by Clerk middleware first.
        // Let's try manual verification if we have the SDK.

        // Wait, 'ClerkExpressWithAuth' is the standard way.
        // It populates req.auth.

        // Let's Dynamically import Clerk (since we just installed it) to avoid load errors if it failed
        const { verifyToken } = await import('@clerk/clerk-sdk-node');

        // Verify token (claims)
        const claims = await verifyToken(token, {
            secretKey: process.env.CLERK_SECRET_KEY
        });

        // 2. Sync / Find User in MongoDB
        const clerkId = claims.sub;
        const email = claims.email; // Note: claims might not have email directly depending on config, but usually does in session token? 
        // Actually standard session tokens might not have email. We might need to fetch the user from Clerk API if it's a new user.

        // Let's try to find by clerkId first.
        let user = await User.findOne({ clerkId });

        if (!user) {
            // JIT: Create User
            // We need email/name. If token doesn't have it, we might need to fetch it.
            // But let's assume for now we can get minimal info or we fetch from Clerk.

            // To fetch from Clerk we need the clerk client.
            const { users } = await import('@clerk/clerk-sdk-node');
            const clerkUser = await users.getUser(clerkId);

            const email = clerkUser.emailAddresses[0]?.emailAddress;
            const name = clerkUser.firstName ? `${clerkUser.firstName} ${clerkUser.lastName || ''}` : 'User';

            // Check if user exists by EMAIL (legacy user who signed up before Clerk)
            // If so, link them.
            user = await User.findOne({ email });

            if (user) {
                user.clerkId = clerkId;
                await user.save();
            } else {
                // Create new
                user = await User.create({
                    name,
                    email,
                    clerkId,
                    password: 'clerk-auth-placeholder-' + Math.random(), // Dummy password
                    role: 'user' // Default role
                });
            }
        }

        req.user = user;
        next();

    } catch (error) {
        console.error('Auth Error:', error);
        res.status(401).json({ success: false, message: 'Not authorized, token failed: ' + error.message });
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
