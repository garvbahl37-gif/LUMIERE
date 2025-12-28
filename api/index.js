import app from '../server/server.js';

export default async function handler(req, res) {
    console.log('Vercel API Handler:', req.method, req.url);

    // Serve as proxy to Express app
    return app(req, res);
}
