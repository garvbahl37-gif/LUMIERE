import { createClient } from 'redis';
import dotenv from 'dotenv';

dotenv.config();

const client = createClient({
    url: process.env.REDIS_URI || 'redis://127.0.0.1:6379'
});

client.on('error', (err) => console.error('Redis Client Error', err));
client.on('connect', () => console.log('Redis Client Connected'));

export const connectRedis = async () => {
    try {
        await client.connect();
    } catch (err) {
        console.error('Failed to connect to Redis', err);
    }
};

export default client;
