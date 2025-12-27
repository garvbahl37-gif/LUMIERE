import { mockCategories, Category } from '@/data/mockCategories';
import { mockProducts } from '@/data/mockProducts';

export type { Category };

export interface CategoriesResponse {
    success: boolean;
    data: Category[];
}

// Calculate product counts dynamically
const getCategoriesWithCounts = (): Category[] => {
    return mockCategories.map(cat => ({
        ...cat,
        productCount: mockProducts.filter(p => p.category.slug === cat.slug).length
    }));
};

export const categoryService = {
    async getCategories(): Promise<CategoriesResponse> {
        // Use mock data with calculated product counts
        return {
            success: true,
            data: getCategoriesWithCounts()
        };
    },

    async getCategory(id: string): Promise<{ success: boolean; data: Category }> {
        const categories = getCategoriesWithCounts();
        const category = categories.find(c => c._id === id || c.slug === id);
        if (!category) {
            throw new Error('Category not found');
        }
        return {
            success: true,
            data: category
        };
    }
};

export default categoryService;
