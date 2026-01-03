
const BACKEND_URL = 'https://lumiere-backend-two.vercel.app/api';
// const BACKEND_URL = 'https://lumiere-backend-two.vercel.app'; // Try root if api is subpath. server.js has app.get('/')

async function testBackend() {
    console.log('Testing Backend Connectivity...');
    console.log('Time:', new Date().toISOString());

    const rootUrl = 'https://lumiere-backend-two.vercel.app/'; // The root of the domain where server.js serves '/'

    // 1. Test Root Health Check (Expected: "API is running...")
    try {
        console.log(`\n--- Test 1: Fetching Root Health Check (${rootUrl}) ---`);
        const health = await fetch(rootUrl);
        console.log('Status:', health.status, health.statusText);
        const text = await health.text();
        console.log('Body (First 500 chars):');
        console.log(text.substring(0, 500));
    } catch (e) {
        console.error('Root Health Check Failed:', e.message);
    }

    // 2. Test API Health Check (Expected: JSON)
    const apiHealthUrl = `${BACKEND_URL}/health`; // /api/health defined in server.js
    try {
        console.log(`\n--- Test 2: Fetching API Health Check (${apiHealthUrl}) ---`);
        const health = await fetch(apiHealthUrl);
        console.log('Status:', health.status, health.statusText);
        const text = await health.text();
        console.log('Body (First 500 chars):');
        console.log(text.substring(0, 500));
    } catch (e) {
        console.error('API Health Check Failed:', e.message);
    }

    // 3. Test Create Order Direct
    console.log(`\n--- Test 3: Creating Order (${BACKEND_URL}/orders/direct) ---`);
    const orderPayload = {
        items: [{
            name: "Debug Product",
            image: "https://via.placeholder.com/150",
            price: 10,
            quantity: 1
        }],
        shippingAddress: {
            fullName: "Debug Bot",
            street: "123 Bug Free Way",
            city: "Silica",
            state: "CA",
            zipCode: "90000",
            country: "US",
            phone: "555-555-5555"
        },
        paymentMethod: "card",
        itemsPrice: 10,
        shippingPrice: 0,
        taxPrice: 0,
        totalPrice: 10
    };

    try {
        const res = await fetch(`${BACKEND_URL}/orders/direct`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(orderPayload)
        });

        console.log('Order Status:', res.status, res.statusText);
        const text = await res.text();
        console.log('Order Body:');
        console.log(text.substring(0, 500));
    } catch (e) {
        console.error('Order Creation Failed:', e.message);
    }
}

testBackend();
