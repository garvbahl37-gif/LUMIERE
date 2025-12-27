// Men's luxury products - 100 unique items with high-quality images
export interface MockProduct {
    _id: string;
    name: string;
    slug: string;
    description: string;
    price: number;
    compareAtPrice?: number;
    category: { _id: string; name: string; slug: string; };
    categoryName: string;
    image: string;
    images: string[];
    stock: number;
    isNew: boolean;
    isFeatured: boolean;
    isActive: boolean;
    rating: number;
    numReviews: number;
    tags: string[];
    gender: 'men';
}

// Men's Watches Images
const watchesImages = [
    "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=800",
    "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=800",
    "https://images.unsplash.com/photo-1533139502658-0198f920d8e8?w=800",
    "https://images.unsplash.com/photo-1548171915-e79a380a2a4b?w=800",
    "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?w=800",
    "https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?w=800",
    "https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?w=800",
    "https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?w=800",
    "https://images.unsplash.com/photo-1539874754764-5a96559165b0?w=800",
    "https://images.unsplash.com/photo-1547996160-81dfa63595aa?w=800",
    "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=800",
    "https://images.unsplash.com/photo-1509048191080-d2984bad6ae5?w=800",
    "https://images.unsplash.com/photo-1526045431048-f857369baa09?w=800",
    "https://images.unsplash.com/photo-1560343090-f0409e92791a?w=800",
    "https://images.unsplash.com/photo-1618220179428-22790b461013?w=800",
    "https://images.unsplash.com/photo-1434056886845-dbd065f85ea5?w=800",
    "https://images.unsplash.com/photo-1495704907664-81f74a7efd9b?w=800",
    "https://images.unsplash.com/photo-1559563362-c667ba5f6152?w=800",
    "https://images.unsplash.com/photo-1604242692760-2f7b0c26856d?w=800",
    "https://images.unsplash.com/photo-1612817159949-195b6eb9e31a?w=800",
];

// Men's Bags Images
const mensBagsImages = [
    "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800",
    "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800",
    "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=800",
    "https://images.unsplash.com/photo-1491637639811-60e2756cc1c7?w=800",
    "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800",
    "https://images.unsplash.com/photo-1585916420730-d7f95e942d43?w=800",
    "https://images.unsplash.com/photo-1473188588951-666fce8e7c68?w=800",
    "https://images.unsplash.com/photo-1547949003-9789c0b62c0c?w=800",
    "https://images.unsplash.com/photo-1548365328-8c6db3220e4c?w=800",
    "https://images.unsplash.com/photo-1592150621744-aca64f48394a?w=800",
    "https://images.unsplash.com/photo-1578237493287-8d4d2b03591a?w=800",
    "https://images.unsplash.com/photo-1553062407-98eeb64c6a45?w=800",
    "https://images.unsplash.com/photo-1575844264771-892081089af5?w=800",
    "https://images.unsplash.com/photo-1581605405669-fcdf81165afa?w=800",
    "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?w=800",
    "https://images.unsplash.com/photo-1622560480654-d83c853bc5c4?w=800",
    "https://images.unsplash.com/photo-1576192520246-3e4b5ef8ff66?w=800",
    "https://images.unsplash.com/photo-1590739225287-bd31519780c3?w=800",
    "https://images.unsplash.com/photo-1605733160314-4fc7dac4bb7b?w=800",
    "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=800",
];

// Men's Shoes Images
const mensShoesImages = [
    "https://images.unsplash.com/photo-1449505278894-297fdb3edbc1?w=800",
    "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=800",
    "https://images.unsplash.com/photo-1605812860427-4024433a70fd?w=800",
    "https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=800",
    "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800",
    "https://images.unsplash.com/photo-1491553895911-0055uj8a3bf3?w=800",
    "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=800",
    "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=800",
    "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800",
    "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800",
    "https://images.unsplash.com/photo-1605348532760-6753d2c43329?w=800",
    "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=800",
    "https://images.unsplash.com/photo-1520219306100-ec61f9697050?w=800",
    "https://images.unsplash.com/photo-1607522370275-f14206abe5d3?w=800",
    "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=800",
    "https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?w=800",
    "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800",
    "https://images.unsplash.com/photo-1614252369475-531eba835eb1?w=800",
    "https://images.unsplash.com/photo-1491553895911-0055uj8a3bf4?w=800",
    "https://images.unsplash.com/photo-1582897085656-c636d006a246?w=800",
];

// Men's Suits Images
const suitImages = [
    "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800",
    "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800",
    "https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?w=800",
    "https://images.unsplash.com/photo-1594938298603-c8148c4dae36?w=800",
    "https://images.unsplash.com/photo-1617137968427-85924c800a22?w=800",
    "https://images.unsplash.com/photo-1598808503746-f34c53b9323e?w=800",
    "https://images.unsplash.com/photo-1580657018950-c7f7d6a6d990?w=800",
    "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=800",
    "https://images.unsplash.com/photo-1619084709681-a8f4edf6d7f8?w=800",
    "https://images.unsplash.com/photo-1608030609295-a2eb7cb09e98?w=800",
    "https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?w=800",
    "https://images.unsplash.com/photo-1592878940526-0214b0f374f6?w=800",
    "https://images.unsplash.com/photo-1509281373149-e957c6296406?w=800",
    "https://images.unsplash.com/photo-1592878849122-facb97520f9e?w=800",
    "https://images.unsplash.com/photo-1581791538302-03537b9c97bf?w=800",
    "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800",
    "https://images.unsplash.com/photo-1600684388091-5d35e7c0aa30?w=800",
    "https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?w=800",
    "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=800",
    "https://images.unsplash.com/photo-1611312449412-6cefac5dc3e4?w=800",
];

// Men's Accessories Images
const mensAccessoriesImages = [
    "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800",
    "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800",
    "https://images.unsplash.com/photo-1473188588951-666fce8e7c68?w=800",
    "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?w=800",
    "https://images.unsplash.com/photo-1612817159949-195b6eb9e31a?w=800",
    "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800",
    "https://images.unsplash.com/photo-1624378439575-d8705ad7ae81?w=800",
    "https://images.unsplash.com/photo-1556306535-0f09a537f0a3?w=800",
    "https://images.unsplash.com/photo-1627123424574-724758594e93?w=800",
    "https://images.unsplash.com/photo-1590739766704-8c5aba847e57?w=800",
    "https://images.unsplash.com/photo-1579389083175-247ef703006a?w=800",
    "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=800",
    "https://images.unsplash.com/photo-1594534475808-b18fc33b045e?w=800",
    "https://images.unsplash.com/photo-1618354691792-d1d42acfd860?w=800",
    "https://images.unsplash.com/photo-1558171813-4c088753af8f?w=800",
    "https://images.unsplash.com/photo-1625591342274-013866180d5b?w=800",
    "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800",
    "https://images.unsplash.com/photo-1556684087-8e0b0d1edf43?w=800",
    "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800",
    "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=800",
];

// Product Names
const watchNames = ["Chronograph Elite", "Classic Automatic", "Diver's Professional", "Dress Watch", "Sport Chronometer", "Pilot Watch", "Skeleton Watch", "Moon Phase", "GMT Master", "Day-Date", "Perpetual Calendar", "Tourbillon", "Racing Chronograph", "Vintage Dress", "Military Field", "Nautical Timer", "Executive Gold", "Minimalist Steel", "Heritage Bronze", "Modern Ceramic"];

const mensBagNames = ["Leather Briefcase", "Messenger Bag", "Laptop Portfolio", "Weekend Duffel", "Leather Backpack", "Document Case", "Travel Carry-On", "Crossbody Satchel", "Slim Folio", "Overnight Bag", "Executive Attache", "Convertible Tote", "Tech Backpack", "Garment Bag", "Duffle Weekender", "Shoulder Messenger", "Leather Holdall", "Business Bag", "Vintage Satchel", "Premium Carryall"];

const mensShoeNames = ["Oxford Dress Shoes", "Derby Brogues", "Leather Loafers", "Chelsea Boots", "Monk Strap", "Penny Loafers", "Wingtip Oxfords", "Suede Loafers", "Dress Boots", "Cap Toe Oxfords", "Tassel Loafers", "Chukka Boots", "Whole Cut", "Double Monk", "Venetian Loafers", "Jodhpur Boots", "Bit Loafers", "Longwing Brogues", "Side Zip Boots", "Opera Pumps"];

const suitNames = ["Classic Navy Suit", "Charcoal Pinstripe", "Slim Fit Black", "Italian Wool", "Double Breasted", "Peak Lapel", "Windowpane Check", "Herringbone Tweed", "Linen Summer", "Velvet Evening", "Tuxedo Set", "Three Piece", "Morning Coat", "Business Gray", "Midnight Blue", "Designer Blazer", "Cashmere Blend", "Sport Coat", "Dinner Jacket", "Modern Fit"];

const mensAccessoryNames = ["Silk Tie", "Leather Belt", "Cufflinks Set", "Pocket Square", "Leather Wallet", "Tie Bar", "Lapel Pin", "Sunglasses", "Money Clip", "Card Holder", "Collar Stays", "Bracelet", "Ring", "Handkerchief Set", "Suspenders", "Bow Tie", "Watch Band", "Passport Holder", "Key Holder", "Collar Pin"];

function createMensProduct(id: number, name: string, catId: string, catName: string, catSlug: string, image: string, basePrice: number): MockProduct {
    const price = basePrice + Math.floor(Math.random() * 500);
    const hasDiscount = Math.random() > 0.7;
    const isNew = Math.random() > 0.6;
    const isFeatured = Math.random() > 0.7;

    const slug = name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');

    return {
        _id: `mens-prod-${id}`,
        name,
        slug,
        description: `Premium ${name.toLowerCase()} crafted with the finest materials. Perfect for the distinguished gentleman who appreciates quality and timeless elegance.`,
        price,
        compareAtPrice: hasDiscount ? price + Math.floor(Math.random() * 300) + 100 : undefined,
        category: { _id: catId, name: catName, slug: catSlug },
        categoryName: catName,
        image,
        images: [image],
        stock: Math.floor(Math.random() * 30) + 5,
        isNew,
        isFeatured,
        isActive: true,
        rating: 4 + Math.random(),
        numReviews: Math.floor(Math.random() * 150) + 10,
        tags: [catSlug, "luxury", "men", "designer", isNew ? "new-arrival" : "", isFeatured ? "featured" : ""].filter(Boolean),
        gender: 'men'
    };
}

export const mockMensProducts: MockProduct[] = [
    // WATCHES
    ...watchNames.map((name, i) => createMensProduct(i + 1, name, "cat-6", "Men's Watches", "mens-watches", watchesImages[i], 2500 + i * 200)),

    // BAGS
    ...mensBagNames.map((name, i) => createMensProduct(i + 21, name, "cat-7", "Men's Bags", "mens-bags", mensBagsImages[i], 450 + i * 80)),

    // SHOES
    ...mensShoeNames.map((name, i) => createMensProduct(i + 41, name, "cat-8", "Men's Shoes", "mens-shoes", mensShoesImages[i], 350 + i * 50)),

    // SUITS
    ...suitNames.map((name, i) => createMensProduct(i + 61, name, "cat-9", "Men's Suits", "mens-suits", suitImages[i], 1200 + i * 150)),

    // ACCESSORIES
    ...mensAccessoryNames.map((name, i) => createMensProduct(i + 81, name, "cat-10", "Men's Accessories", "mens-accessories", mensAccessoriesImages[i], 95 + i * 40))
];

export default mockMensProducts;
