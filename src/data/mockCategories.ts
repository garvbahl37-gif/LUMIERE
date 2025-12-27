// Premium product categories with unique hero images - Women's & Men's
export interface Category {
    _id: string;
    name: string;
    slug: string;
    description: string;
    image: string;
    heroImage: string;
    productCount?: number;
    gender?: 'women' | 'men' | 'unisex';
}

export const mockCategories: Category[] = [
    // Women's Categories
    {
        _id: "cat-1",
        name: "Handbags",
        slug: "handbags",
        description: "Elegant designer handbags for the modern woman",
        image: "https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/c4d73f153735053.6334f85b0de15.jpg",
        heroImage: "https://static.vecteezy.com/system/resources/previews/031/691/802/large_2x/luxury-leather-handbag-and-minimalistic-backdrop-created-with-generative-ai-photo.jpg",
        gender: "women"
    },
    {
        _id: "cat-2",
        name: "Jewelry",
        slug: "jewelry",
        description: "Exquisite fine jewelry and accessories",
        image: "https://i.pinimg.com/originals/27/37/ec/2737ec286540249637a015587b34ddd1.jpg",
        heroImage: "https://wallpaperaccess.com/full/4609744.jpg",
        gender: "women"
    },
    {
        _id: "cat-3",
        name: "Shoes",
        slug: "shoes",
        description: "Luxury footwear for every occasion",
        image: "https://mir-s3-cdn-cf.behance.net/project_modules/1400/c2743e81603619.5d042a2593a0f.jpg",
        heroImage: "https://static.vecteezy.com/system/resources/previews/012/172/303/non_2x/woman-shoes-banner-high-heels-closeup-top-view-women-fashion-ladies-accessories-girly-casual-formal-shoe-isolated-white-background-footwear-on-floor-copy-space-mockup-flat-lay-selective-focus-photo.jpg",
        gender: "women"
    },
    {
        _id: "cat-4",
        name: "Dresses",
        slug: "dresses",
        description: "Stunning designer dresses for all occasions",
        image: "https://image.lexica.art/full_jpg/b7f5f68c-1788-4a51-9cb8-752e3e95e455",
        heroImage: "https://wallpaperaccess.com/full/9842925.jpg",
        gender: "women"
    },
    {
        _id: "cat-5",
        name: "Accessories",
        slug: "accessories",
        description: "Premium accessories to complete your look",
        image: "https://thumbs.dreamstime.com/z/fashion-portrait-stylish-pretty-woman-sunglasses-scarf-posing-fashion-portrait-stylish-pretty-woman-sunglasses-scarf-115493900.jpg",
        heroImage: "https://img.freepik.com/premium-photo/flat-lay-with-women-accessories_72402-379.jpg?w=2000",
        gender: "women"
    },
    // Men's Categories
    {
        _id: "cat-6",
        name: "Men's Watches",
        slug: "mens-watches",
        description: "Luxury timepieces for the distinguished gentleman",
        image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=800",
        heroImage: "https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?w=1920",
        gender: "men"
    },
    {
        _id: "cat-7",
        name: "Men's Bags",
        slug: "mens-bags",
        description: "Premium leather briefcases and messenger bags",
        image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800",
        heroImage: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=1920",
        gender: "men"
    },
    {
        _id: "cat-8",
        name: "Men's Shoes",
        slug: "mens-shoes",
        description: "Sophisticated footwear for every occasion",
        image: "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=800",
        heroImage: "https://images.unsplash.com/photo-1449505278894-297fdb3edbc1?w=1920",
        gender: "men"
    },
    {
        _id: "cat-9",
        name: "Men's Suits",
        slug: "mens-suits",
        description: "Bespoke suits and designer blazers",
        image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800",
        heroImage: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=1920",
        gender: "men"
    },
    {
        _id: "cat-10",
        name: "Men's Accessories",
        slug: "mens-accessories",
        description: "Luxury ties, cufflinks, wallets and belts",
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800",
        heroImage: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=1920",
        gender: "men"
    },
];

export default mockCategories;
