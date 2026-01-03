
// ESM syntax, using native fetch (Node 18+)
// const fetch = require('node-fetch'); // Removed

const API_URL = 'https://lumiere-backend-two.vercel.app/api';

async function checkProducts() {
    try {
        console.log(`Checking products from: ${API_URL}/products`);
        const response = await fetch(`${API_URL}/products`);

        console.log(`Status: ${response.status}`);

        if (!response.ok) {
            console.error('Failed to fetch products');
            const text = await response.text();
            console.error('Response:', text);
            return;
        }

        const data = await response.json();
        console.log('Response Data Structure:', JSON.stringify(data, null, 2).substring(0, 500) + '...');

        let products = [];
        if (Array.isArray(data)) {
            products = data;
        } else if (data.products && Array.isArray(data.products)) {
            products = data.products;
        } else if (data.data && Array.isArray(data.data)) {
            products = data.data;
        }

        console.log(`Found ${products.length} products.`);
    } catch (error) {
        console.error('Error:', error);
    }
}

checkProducts();
