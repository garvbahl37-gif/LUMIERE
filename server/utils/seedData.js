import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Category from '../models/Category.js';
import Product from '../models/Product.js';
import User from '../models/User.js';

dotenv.config();

const categories = [
    {
        name: 'Handbags',
        description: 'Luxury designer handbags',
        image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800',
        productCount: 25
    },
    {
        name: 'Jewelry',
        description: 'Fine jewelry collections',
        image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800',
        productCount: 25
    },
    {
        name: 'Shoes',
        description: 'Designer footwear',
        image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=800',
        productCount: 25
    },
    {
        name: 'Dresses',
        description: 'Elegant evening wear',
        image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800',
        productCount: 25
    }
];

const handbagImages = [
    'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800',
    'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800',
    'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=800',
    'https://images.unsplash.com/photo-1614179689702-355944cd0918?w=800',
    'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800',
    'https://images.unsplash.com/photo-1591561954557-26941169b49e?w=800',
    'https://images.unsplash.com/photo-1594223274512-ad4803739b7c?w=800',
    'https://images.unsplash.com/photo-1598532163257-ae3c6b2524b6?w=800',
    'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=800',
    'https://images.unsplash.com/photo-1575032617751-6ddec2089882?w=800',
];

const jewelryImages = [
    'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800',
    'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800',
    'https://images.unsplash.com/photo-1603561596112-0a132b757442?w=800',
    'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800',
    'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=800',
    'https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=800',
    'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800',
    'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800',
    'https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?w=800',
    'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=800',
];

const shoeImages = [
    'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=800',
    'https://images.unsplash.com/photo-1518894781321-630e638d0742?w=800',
    'https://images.unsplash.com/photo-1596703263926-eb0762ee17e4?w=800',
    'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=800',
    'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=800',
    'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800',
    'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800',
    'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800',
    'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800',
    'https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?w=800',
];

const dressImages = [
    'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800',
    'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=800',
    'https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=800',
    'https://images.unsplash.com/photo-1572804013427-4d7ca7268217?w=800',
    'https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=800',
    'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=800',
    'https://images.unsplash.com/photo-1612336307429-8a898d10e223?w=800',
    'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=800',
    'https://images.unsplash.com/photo-1495385794356-15371f348c31?w=800',
    'https://images.unsplash.com/photo-1502716119720-b23a93e5fe1b?w=800',
];

const handbagNames = ['Aria Tote', 'Luna Clutch', 'Stella Satchel', 'Nova Crossbody', 'Celeste Hobo', 'Mira Shoulder Bag', 'Isla Mini Bag', 'Vera Bucket Bag', 'Aurora Backpack', 'Diana Baguette'];
const jewelryNames = ['Eternal Ring', 'Luna Necklace', 'Stardust Earrings', 'Aurora Bracelet', 'Celestial Pendant', 'Moonlight Choker', 'Diamond Studs', 'Pearl Drops', 'Gold Cuff', 'Crystal Hoops'];
const shoeNames = ['Aria Heels', 'Luna Pumps', 'Stella Stilettos', 'Nova Loafers', 'Celeste Sandals', 'Mira Boots', 'Isla Flats', 'Vera Sneakers', 'Aurora Mules', 'Diana Wedges'];
const dressNames = ['Silk Gown', 'Velvet Midi', 'Satin Slip', 'Lace Maxi', 'Chiffon Wrap', 'Sequin Mini', 'Crepe Blazer', 'Jersey Sheath', 'Tulle Ball', 'Cotton Sundress'];

const generateProducts = (categoryId, categoryName, names, images, startIndex) => {
    return names.map((name, i) => ({
        name: `${name} ${categoryName === 'Jewelry' ? '' : 'Bag'}`.trim().replace(' Bag Bag', ' Bag'),
        description: `Exquisite ${name.toLowerCase()} crafted with premium materials. Perfect for any occasion with timeless elegance and superior quality.`,
        price: Math.floor(Math.random() * 900) + 100,
        compareAtPrice: Math.floor(Math.random() * 400) + 200,
        category: categoryId,
        categoryName,
        image: images[i % images.length],
        images: [images[i % images.length]],
        stock: Math.floor(Math.random() * 50) + 5,
        isNew: i < 3,
        isFeatured: i < 2,
        rating: (Math.random() * 1 + 4).toFixed(1),
        numReviews: Math.floor(Math.random() * 200) + 10,
        tags: [categoryName.toLowerCase(), 'luxury', 'designer', 'women']
    }));
};

const seedData = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        await Category.deleteMany({});
        await Product.deleteMany({});
        console.log('Cleared existing data');

        const createdCategories = await Category.insertMany(categories);
        console.log(`Created ${createdCategories.length} categories`);

        const allProducts = [
            ...generateProducts(createdCategories[0]._id, 'Handbags', handbagNames, handbagImages, 0),
            ...generateProducts(createdCategories[1]._id, 'Jewelry', jewelryNames, jewelryImages, 10),
            ...generateProducts(createdCategories[2]._id, 'Shoes', shoeNames, shoeImages, 20),
            ...generateProducts(createdCategories[3]._id, 'Dresses', dressNames, dressImages, 30),
        ];

        const createdProducts = await Product.insertMany(allProducts);
        console.log(`Created ${createdProducts.length} products`);

        const adminExists = await User.findOne({ email: 'admin@lumiere.com' });
        if (!adminExists) {
            await User.create({
                name: 'Admin',
                email: 'admin@lumiere.com',
                password: 'admin123',
                role: 'admin'
            });
            console.log('Created admin user');
        }

        console.log('\n✅ Database seeded successfully!');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
};

seedData();
