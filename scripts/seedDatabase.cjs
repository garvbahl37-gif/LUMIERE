// MongoDB Atlas Seed Script for Lumière E-commerce
// Connection: mongodb+srv://admin:garv11052004@cluster0.7hurkqc.mongodb.net/?appName=Cluster0
// Database: lumiere
// Run with: node scripts/seedDatabase.cjs

const { MongoClient } = require('mongodb');


const MONGODB_URI = 'mongodb+srv://admin:garv11052004@cluster0.7hurkqc.mongodb.net/?appName=Cluster0';
const DATABASE_NAME = 'lumiere';

// Categories Data
const categories = [
    {
        _id: 'cat-handbags',
        name: 'Handbags',
        slug: 'handbags',
        description: 'Exquisite leather handbags and totes',
        image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&q=80',
        productCount: 5
    },
    {
        _id: 'cat-jewelry',
        name: 'Jewelry',
        slug: 'jewelry',
        description: 'Timeless jewelry and accessories',
        image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&q=80',
        productCount: 5
    },
    {
        _id: 'cat-shoes',
        name: 'Shoes',
        slug: 'shoes',
        description: 'Designer heels and flats',
        image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=800&q=80',
        productCount: 5
    },
    {
        _id: 'cat-accessories',
        name: 'Accessories',
        slug: 'accessories',
        description: 'Scarves, belts and more',
        image: 'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=800&q=80',
        productCount: 7
    }
];

// Products Data
const products = [
    // Handbags
    {
        _id: 'prod-001',
        name: 'Quilted Leather Shoulder Bag',
        slug: 'quilted-leather-shoulder-bag',
        description: 'Luxurious quilted lambskin leather shoulder bag with gold-tone chain strap. Features a turn-lock closure and spacious interior with card slots.',
        price: 2890,
        compareAtPrice: 3200,
        image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&q=80',
        images: ['https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&q=80'],
        category: { _id: 'cat-handbags', name: 'Handbags', slug: 'handbags' },
        categoryName: 'Handbags',
        stock: 15,
        isNew: true,
        isFeatured: true,
        tags: ['leather', 'designer', 'luxury', 'shoulder bag']
    },
    {
        _id: 'prod-002',
        name: 'Classic Leather Tote',
        slug: 'classic-leather-tote',
        description: 'Timeless leather tote bag crafted from premium Italian calfskin. Perfect for work or weekend.',
        price: 1850,
        image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800&q=80',
        images: ['https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800&q=80'],
        category: { _id: 'cat-handbags', name: 'Handbags', slug: 'handbags' },
        categoryName: 'Handbags',
        stock: 20,
        isNew: false,
        isFeatured: true,
        tags: ['leather', 'tote', 'work bag', 'italian']
    },
    {
        _id: 'prod-003',
        name: 'Mini Crossbody Bag',
        slug: 'mini-crossbody-bag',
        description: 'Compact yet spacious mini crossbody in butter-soft leather. Adjustable strap for versatile styling.',
        price: 1290,
        image: 'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=800&q=80',
        images: ['https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=800&q=80'],
        category: { _id: 'cat-handbags', name: 'Handbags', slug: 'handbags' },
        categoryName: 'Handbags',
        stock: 25,
        isNew: true,
        isFeatured: false,
        tags: ['crossbody', 'mini', 'leather', 'everyday']
    },
    {
        _id: 'prod-004',
        name: 'Structured Top Handle Bag',
        slug: 'structured-top-handle-bag',
        description: 'Sophisticated structured bag with dual top handles and optional shoulder strap.',
        price: 2450,
        image: 'https://images.unsplash.com/photo-1614179689702-355944cd0918?w=800&q=80',
        images: ['https://images.unsplash.com/photo-1614179689702-355944cd0918?w=800&q=80'],
        category: { _id: 'cat-handbags', name: 'Handbags', slug: 'handbags' },
        categoryName: 'Handbags',
        stock: 12,
        isNew: false,
        isFeatured: false,
        tags: ['structured', 'top handle', 'formal', 'elegant']
    },
    {
        _id: 'prod-005',
        name: 'Woven Leather Clutch',
        slug: 'woven-leather-clutch',
        description: 'Artisan-crafted woven leather clutch. Perfect for evening occasions.',
        price: 890,
        image: 'https://images.unsplash.com/photo-1594223274512-ad4803739b7c?w=800&q=80',
        images: ['https://images.unsplash.com/photo-1594223274512-ad4803739b7c?w=800&q=80'],
        category: { _id: 'cat-handbags', name: 'Handbags', slug: 'handbags' },
        categoryName: 'Handbags',
        stock: 30,
        isNew: false,
        isFeatured: false,
        tags: ['clutch', 'evening', 'woven', 'artisan']
    },
    // Jewelry
    {
        _id: 'prod-006',
        name: 'Pearl Drop Earrings',
        slug: 'pearl-drop-earrings',
        description: 'Elegant freshwater pearl drop earrings set in 18k gold. A timeless addition to any collection.',
        price: 495,
        image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&q=80',
        images: ['https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&q=80'],
        category: { _id: 'cat-jewelry', name: 'Jewelry', slug: 'jewelry' },
        categoryName: 'Jewelry',
        stock: 50,
        isNew: true,
        isFeatured: true,
        tags: ['pearl', 'earrings', 'gold', 'timeless']
    },
    {
        _id: 'prod-007',
        name: 'Diamond Tennis Bracelet',
        slug: 'diamond-tennis-bracelet',
        description: 'Stunning diamond tennis bracelet featuring 3 carats of brilliant-cut diamonds in 18k white gold.',
        price: 8950,
        compareAtPrice: 9500,
        image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&q=80',
        images: ['https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&q=80'],
        category: { _id: 'cat-jewelry', name: 'Jewelry', slug: 'jewelry' },
        categoryName: 'Jewelry',
        stock: 5,
        isNew: false,
        isFeatured: true,
        tags: ['diamond', 'bracelet', 'luxury', 'white gold']
    },
    {
        _id: 'prod-008',
        name: 'Gold Chain Necklace',
        slug: 'gold-chain-necklace',
        description: 'Classic 18k gold chain necklace with adjustable length. Layer with other pieces or wear alone.',
        price: 1250,
        image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&q=80',
        images: ['https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&q=80'],
        category: { _id: 'cat-jewelry', name: 'Jewelry', slug: 'jewelry' },
        categoryName: 'Jewelry',
        stock: 35,
        isNew: false,
        isFeatured: false,
        tags: ['gold', 'chain', 'necklace', 'layering']
    },
    {
        _id: 'prod-009',
        name: 'Sapphire Statement Ring',
        slug: 'sapphire-statement-ring',
        description: 'Breathtaking blue sapphire cocktail ring surrounded by brilliant diamonds.',
        price: 4500,
        image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&q=80',
        images: ['https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&q=80'],
        category: { _id: 'cat-jewelry', name: 'Jewelry', slug: 'jewelry' },
        categoryName: 'Jewelry',
        stock: 8,
        isNew: true,
        isFeatured: false,
        tags: ['sapphire', 'ring', 'statement', 'cocktail']
    },
    {
        _id: 'prod-010',
        name: 'Diamond Stud Earrings',
        slug: 'diamond-stud-earrings',
        description: 'Classic 1 carat total weight diamond studs in platinum settings.',
        price: 3200,
        image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&q=80',
        images: ['https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&q=80'],
        category: { _id: 'cat-jewelry', name: 'Jewelry', slug: 'jewelry' },
        categoryName: 'Jewelry',
        stock: 15,
        isNew: false,
        isFeatured: true,
        tags: ['diamond', 'studs', 'platinum', 'classic']
    },
    // Shoes
    {
        _id: 'prod-011',
        name: 'Classic Stiletto Heels',
        slug: 'classic-stiletto-heels',
        description: 'Elegant point-toe stiletto heels in Italian leather. 4-inch heel with cushioned insole.',
        price: 795,
        image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=800&q=80',
        images: ['https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=800&q=80'],
        category: { _id: 'cat-shoes', name: 'Shoes', slug: 'shoes' },
        categoryName: 'Shoes',
        stock: 20,
        isNew: true,
        isFeatured: true,
        tags: ['heels', 'stiletto', 'leather', 'italian']
    },
    {
        _id: 'prod-012',
        name: 'Embellished Slingback Pumps',
        slug: 'embellished-slingback-pumps',
        description: 'Crystal-embellished satin slingback pumps. Perfect for special occasions.',
        price: 1150,
        image: 'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=800&q=80',
        images: ['https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=800&q=80'],
        category: { _id: 'cat-shoes', name: 'Shoes', slug: 'shoes' },
        categoryName: 'Shoes',
        stock: 12,
        isNew: false,
        isFeatured: false,
        tags: ['crystal', 'slingback', 'satin', 'formal']
    },
    {
        _id: 'prod-013',
        name: 'Leather Ballet Flats',
        slug: 'leather-ballet-flats',
        description: 'Buttery-soft leather ballet flats with bow detail. All-day comfort meets elegance.',
        price: 450,
        image: 'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=800&q=80',
        images: ['https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=800&q=80'],
        category: { _id: 'cat-shoes', name: 'Shoes', slug: 'shoes' },
        categoryName: 'Shoes',
        stock: 40,
        isNew: false,
        isFeatured: true,
        tags: ['flats', 'ballet', 'leather', 'comfortable']
    },
    {
        _id: 'prod-014',
        name: 'Ankle Strap Sandals',
        slug: 'ankle-strap-sandals',
        description: 'Minimalist ankle strap sandals with block heel. Versatile styling for any occasion.',
        price: 595,
        image: 'https://images.unsplash.com/photo-1596703263926-eb0762ee17e4?w=800&q=80',
        images: ['https://images.unsplash.com/photo-1596703263926-eb0762ee17e4?w=800&q=80'],
        category: { _id: 'cat-shoes', name: 'Shoes', slug: 'shoes' },
        categoryName: 'Shoes',
        stock: 25,
        isNew: true,
        isFeatured: false,
        tags: ['sandals', 'block heel', 'minimalist', 'summer']
    },
    {
        _id: 'prod-015',
        name: 'Suede Knee-High Boots',
        slug: 'suede-knee-high-boots',
        description: 'Luxurious suede knee-high boots with inside zip. A winter wardrobe essential.',
        price: 1290,
        compareAtPrice: 1450,
        image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=800&q=80',
        images: ['https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=800&q=80'],
        category: { _id: 'cat-shoes', name: 'Shoes', slug: 'shoes' },
        categoryName: 'Shoes',
        stock: 18,
        isNew: false,
        isFeatured: false,
        tags: ['boots', 'suede', 'knee-high', 'winter']
    },
    // Accessories
    {
        _id: 'prod-016',
        name: 'Silk Scarf Collection',
        slug: 'silk-scarf-collection',
        description: 'Hand-rolled silk twill scarf with exclusive print. 90x90cm.',
        price: 395,
        image: 'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=800&q=80',
        images: ['https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=800&q=80'],
        category: { _id: 'cat-accessories', name: 'Accessories', slug: 'accessories' },
        categoryName: 'Accessories',
        stock: 35,
        isNew: true,
        isFeatured: true,
        tags: ['silk', 'scarf', 'printed', 'luxury']
    },
    {
        _id: 'prod-017',
        name: 'Leather Belt',
        slug: 'leather-belt',
        description: 'Refined leather belt with signature gold buckle. Adjustable sizing.',
        price: 295,
        image: 'https://images.unsplash.com/photo-1624222247344-550fb60583dc?w=800&q=80',
        images: ['https://images.unsplash.com/photo-1624222247344-550fb60583dc?w=800&q=80'],
        category: { _id: 'cat-accessories', name: 'Accessories', slug: 'accessories' },
        categoryName: 'Accessories',
        stock: 45,
        isNew: false,
        isFeatured: false,
        tags: ['belt', 'leather', 'gold', 'essential']
    },
    {
        _id: 'prod-018',
        name: 'Designer Sunglasses',
        slug: 'designer-sunglasses',
        description: 'Oversized cat-eye sunglasses with gradient lenses. UV400 protection.',
        price: 450,
        image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&q=80',
        images: ['https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&q=80'],
        category: { _id: 'cat-accessories', name: 'Accessories', slug: 'accessories' },
        categoryName: 'Accessories',
        stock: 30,
        isNew: true,
        isFeatured: true,
        tags: ['sunglasses', 'cat-eye', 'designer', 'summer']
    },
    {
        _id: 'prod-019',
        name: 'Cashmere Wrap',
        slug: 'cashmere-wrap',
        description: 'Ultra-soft 100% cashmere wrap in timeless neutral. Travel essential.',
        price: 595,
        image: 'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=800&q=80',
        images: ['https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=800&q=80'],
        category: { _id: 'cat-accessories', name: 'Accessories', slug: 'accessories' },
        categoryName: 'Accessories',
        stock: 22,
        isNew: false,
        isFeatured: false,
        tags: ['cashmere', 'wrap', 'travel', 'cozy']
    },
    {
        _id: 'prod-020',
        name: 'Leather Card Holder',
        slug: 'leather-card-holder',
        description: 'Slim leather card holder with 6 slots. Embossed logo detail.',
        price: 195,
        image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=800&q=80',
        images: ['https://images.unsplash.com/photo-1627123424574-724758594e93?w=800&q=80'],
        category: { _id: 'cat-accessories', name: 'Accessories', slug: 'accessories' },
        categoryName: 'Accessories',
        stock: 60,
        isNew: false,
        isFeatured: false,
        tags: ['card holder', 'leather', 'slim', 'wallet']
    },
    {
        _id: 'prod-021',
        name: 'Luxury Watch',
        slug: 'luxury-watch',
        description: 'Swiss-made automatic watch with mother-of-pearl dial. 18k rose gold case.',
        price: 12500,
        image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=800&q=80',
        images: ['https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=800&q=80'],
        category: { _id: 'cat-accessories', name: 'Accessories', slug: 'accessories' },
        categoryName: 'Accessories',
        stock: 3,
        isNew: true,
        isFeatured: true,
        tags: ['watch', 'swiss', 'luxury', 'rose gold']
    },
    {
        _id: 'prod-022',
        name: 'Hair Accessories Set',
        slug: 'hair-accessories-set',
        description: 'Set of 3 silk-wrapped hair clips with pearl embellishments.',
        price: 145,
        image: 'https://images.unsplash.com/photo-1596944924616-7b38e7cfac36?w=800&q=80',
        images: ['https://images.unsplash.com/photo-1596944924616-7b38e7cfac36?w=800&q=80'],
        category: { _id: 'cat-accessories', name: 'Accessories', slug: 'accessories' },
        categoryName: 'Accessories',
        stock: 40,
        isNew: false,
        isFeatured: false,
        tags: ['hair', 'clips', 'silk', 'pearl']
    }
];

async function seedDatabase() {
    const client = new MongoClient(MONGODB_URI);

    try {
        await client.connect();
        console.log('Connected to MongoDB Atlas');

        const db = client.db(DATABASE_NAME);

        // Drop existing collections
        console.log('Clearing existing data...');
        await db.collection('categories').deleteMany({});
        await db.collection('products').deleteMany({});

        // Insert categories
        console.log('Inserting categories...');
        await db.collection('categories').insertMany(categories);
        console.log(`Inserted ${categories.length} categories`);

        // Insert products
        console.log('Inserting products...');
        await db.collection('products').insertMany(products);
        console.log(`Inserted ${products.length} products`);

        // Create indexes
        console.log('Creating indexes...');
        await db.collection('products').createIndex({ name: 'text', description: 'text', tags: 'text' });
        await db.collection('products').createIndex({ 'category._id': 1 });
        await db.collection('products').createIndex({ price: 1 });
        await db.collection('products').createIndex({ isNew: 1 });
        await db.collection('products').createIndex({ isFeatured: 1 });

        console.log('\n✅ Database seeded successfully!');
        console.log(`Database: ${DATABASE_NAME}`);
        console.log(`Categories: ${categories.length}`);
        console.log(`Products: ${products.length}`);

    } catch (error) {
        console.error('Error seeding database:', error);
    } finally {
        await client.close();
        console.log('\nConnection closed');
    }
}

// Run the seed
seedDatabase();
