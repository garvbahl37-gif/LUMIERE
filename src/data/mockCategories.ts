// Women's luxury product categories with unique hero images and 4K scraped content
export interface Category {
    _id: string;
    name: string;
    slug: string;
    description: string;
    image: string;
    heroImage: string;
    productCount?: number;
}

export const mockCategories: Category[] = [
    {
        _id: "cat-1",
        name: "Handbags",
        slug: "handbags",
        description: "Elegant designer handbags for the modern woman",
        image: "https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/c4d73f153735053.6334f85b0de15.jpg",
        heroImage: "https://static.vecteezy.com/system/resources/previews/031/691/802/large_2x/luxury-leather-handbag-and-minimalistic-backdrop-created-with-generative-ai-photo.jpg"
    },
    {
        _id: "cat-2",
        name: "Jewelry",
        slug: "jewelry",
        description: "Exquisite fine jewelry and accessories",
        image: "https://i.pinimg.com/originals/27/37/ec/2737ec286540249637a015587b34ddd1.jpg",
        heroImage: "https://wallpaperaccess.com/full/4609744.jpg"
    },
    {
        _id: "cat-3",
        name: "Shoes",
        slug: "shoes",
        description: "Luxury footwear for every occasion",
        image: "https://mir-s3-cdn-cf.behance.net/project_modules/1400/c2743e81603619.5d042a2593a0f.jpg",
        heroImage: "https://static.vecteezy.com/system/resources/previews/012/172/303/non_2x/woman-shoes-banner-high-heels-closeup-top-view-women-fashion-ladies-accessories-girly-casual-formal-shoe-isolated-white-background-footwear-on-floor-copy-space-mockup-flat-lay-selective-focus-photo.jpg"
    },
    {
        _id: "cat-4",
        name: "Dresses",
        slug: "dresses",
        description: "Stunning designer dresses for all occasions",
        image: "https://image.lexica.art/full_jpg/b7f5f68c-1788-4a51-9cb8-752e3e95e455",
        heroImage: "https://wallpaperaccess.com/full/9842925.jpg"
    },
    {
        _id: "cat-5",
        name: "Accessories",
        slug: "accessories",
        description: "Premium accessories to complete your look",
        image: "https://thumbs.dreamstime.com/z/fashion-portrait-stylish-pretty-woman-sunglasses-scarf-posing-fashion-portrait-stylish-pretty-woman-sunglasses-scarf-115493900.jpg",
        heroImage: "https://img.freepik.com/premium-photo/flat-lay-with-women-accessories_72402-379.jpg?w=2000"
    },
];

export default mockCategories;
