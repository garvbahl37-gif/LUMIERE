# Redis Caching for Product API

To improve the load times of product images on the frontend, we will cache the product API responses using Redis. This allows the backend to serve the product details (including the image URLs) much faster without hitting the MongoDB database every time. 

## Proposed Changes

### 1. Setup Redis Client
- Install the `redis` npm package in the `server` directory.
- Add `server/config/redis.js` to create and connect the Redis client. We will use `process.env.REDIS_URI` with a fallback to `redis://127.0.0.1:6379`.

#### [NEW] redis.js(file:///c:/Users/DELL/Downloads/Projects/E-commerce-platform/server/config/redis.js)

### 2. Create Caching Middleware
- Create a middleware function that checks if the Redis cache exists for the requested route URL. 
- If the cache exists, return it immediately.
- If not, it will capture `res.json()`, store the result in Redis with an expiration time (e.g., 1 hour), and then send the response.

#### [NEW] redisMiddleware.js(file:///c:/Users/DELL/Downloads/Projects/E-commerce-platform/server/middleware/redisMiddleware.js)

### 3. Apply Cache to Product Routes
- Add the caching middleware to the `GET` endpoints in `productRoutes.js` (e.g., `/`, `/featured`, `/new`, `/:id`).

#### [MODIFY] productRoutes.js(file:///c:/Users/DELL/Downloads/Projects/E-commerce-platform/server/routes/productRoutes.js)

### 4. Cache Invalidation
- When a product is created, updated, or deleted via the Admin routes, we must clear the relevant Redis cache keys so users don't see stale data. We will update `productController.js` to flush the product caches on modifications.

#### [MODIFY] productController.js(file:///c:/Users/DELL/Downloads/Projects/E-commerce-platform/server/controllers/productController.js)

## User Review Required
> [!IMPORTANT]
> **Redis Server:** Running Redis natively on Windows is not officially supported. Do you already have a Redis server running (e.g. via WSL, Docker, or a cloud provider like Upstash/Render)? I will need the connection URI to add to the `.env` file for the backend. If you don't have one, I can provide instructions for setting one up.
