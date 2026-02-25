import client from '../config/redis.js';

export const cacheMiddleware = (durationInSeconds = 3600) => {
    return async (req, res, next) => {
        // Only cache GET requests
        if (req.method !== 'GET') {
            return next();
        }

        // Construct a unique cache key based on the URL and query parameters
        const key = `cache:${req.originalUrl}`;

        try {
            if (!client.isOpen) {
                return next();
            }

            const cachedData = await client.get(key);

            if (cachedData) {
                // If cache exists, return it parsing the JSON
                return res.json(JSON.parse(cachedData));
            } else {
                // Intercept the res.json method to capture the payload
                const originalJson = res.json;
                res.json = function (body) {
                    // Store the result in Redis with an expiration
                    if (client.isOpen && res.statusCode === 200) {
                        client.setEx(key, durationInSeconds, JSON.stringify(body))
                            .catch(err => console.error('Redis Cache Error', err));
                    }

                    // Call the original res.json
                    return originalJson.call(this, body);
                };
                next();
            }
        } catch (error) {
            console.error('Redis Middleware Error:', error);
            next();
        }
    };
};
