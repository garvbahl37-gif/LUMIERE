import { mockProducts, MockProduct } from '@/data/mockProducts';

export interface Product {
    _id: string;
    name: string;
    slug: string;
    description: string;
    price: number;
    compareAtPrice?: number;
    category: {
        _id: string;
        name: string;
        slug: string;
    };
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
}

export interface ProductsResponse {
    success: boolean;
    data: Product[];
    pagination?: {
        page: number;
        limit: number;
        total: number;
        pages: number;
    };
}

export interface ProductFilters {
    category?: string;
    minPrice?: number;
    maxPrice?: number;
    isNew?: boolean;
    sort?: 'price-asc' | 'price-desc' | 'newest' | 'rating';
    search?: string;
    page?: number;
    limit?: number;
}

// Local filtering and sorting functions
const filterProducts = (products: MockProduct[], filters: ProductFilters): MockProduct[] => {
    let filtered = [...products];

    // Category filter
    if (filters.category) {
        filtered = filtered.filter(p =>
            p.category.slug === filters.category ||
            p.category._id === filters.category ||
            p.category.name.toLowerCase() === filters.category.toLowerCase()
        );
    }

    // Price range filter
    if (filters.minPrice !== undefined) {
        filtered = filtered.filter(p => p.price >= filters.minPrice!);
    }
    if (filters.maxPrice !== undefined) {
        filtered = filtered.filter(p => p.price <= filters.maxPrice!);
    }

    // New arrivals filter
    if (filters.isNew) {
        filtered = filtered.filter(p => p.isNew);
    }

    // Search filter
    if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        filtered = filtered.filter(p =>
            p.name.toLowerCase().includes(searchLower) ||
            p.description.toLowerCase().includes(searchLower) ||
            p.tags.some(tag => tag.toLowerCase().includes(searchLower)) ||
            p.categoryName.toLowerCase().includes(searchLower)
        );
    }

    // Sorting
    if (filters.sort) {
        switch (filters.sort) {
            case 'price-asc':
                filtered.sort((a, b) => a.price - b.price);
                break;
            case 'price-desc':
                filtered.sort((a, b) => b.price - a.price);
                break;
            case 'newest':
                filtered.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
                break;
            case 'rating':
                filtered.sort((a, b) => b.rating - a.rating);
                break;
        }
    }

    return filtered;
};

const paginateProducts = (products: MockProduct[], page: number, limit: number) => {
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    return {
        data: products.slice(startIndex, endIndex),
        pagination: {
            page,
            limit,
            total: products.length,
            pages: Math.ceil(products.length / limit)
        }
    };
};

export const productService = {
    async getProducts(filters: ProductFilters = {}): Promise<ProductsResponse> {
        // Use mock data directly (no backend needed)
        const filtered = filterProducts(mockProducts, filters);
        const page = filters.page || 1;
        const limit = filters.limit || 12;
        const { data, pagination } = paginateProducts(filtered, page, limit);

        return {
            success: true,
            data: data as Product[],
            pagination
        };
    },

    async getFeaturedProducts(limit = 8): Promise<ProductsResponse> {
        const featured = mockProducts.filter(p => p.isFeatured).slice(0, limit);
        return {
            success: true,
            data: featured as Product[]
        };
    },

    async getNewArrivals(limit = 8): Promise<ProductsResponse> {
        const newArrivals = mockProducts.filter(p => p.isNew).slice(0, limit);
        return {
            success: true,
            data: newArrivals as Product[]
        };
    },

    async getProduct(id: string): Promise<{ success: boolean; data: Product }> {
        const product = mockProducts.find(p => p._id === id);
        if (!product) {
            throw new Error('Product not found');
        }
        return {
            success: true,
            data: product as Product
        };
    },

    async getProductBySlug(slug: string): Promise<{ success: boolean; data: Product }> {
        const product = mockProducts.find(p => p.slug === slug);
        if (!product) {
            throw new Error('Product not found');
        }
        return {
            success: true,
            data: product as Product
        };
    },

    async searchProducts(query: string): Promise<ProductsResponse> {
        const filtered = filterProducts(mockProducts, { search: query });
        return {
            success: true,
            data: filtered as Product[]
        };
    }
};

export default productService;
