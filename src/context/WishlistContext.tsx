import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { mockProducts } from '@/data/mockProducts';
import { toast } from 'sonner';

export interface WishlistItem {
    _id: string;
    productId: string;
    name: string;
    image: string;
    price: number;
    category: string;
}

interface WishlistContextType {
    items: WishlistItem[];
    isLoading: boolean;
    addToWishlist: (productId: string) => void;
    removeFromWishlist: (productId: string) => void;
    isInWishlist: (productId: string) => boolean;
    clearWishlist: () => void;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

const WISHLIST_STORAGE_KEY = 'lumiere-wishlist';

const getStoredWishlist = (): WishlistItem[] => {
    try {
        const stored = localStorage.getItem(WISHLIST_STORAGE_KEY);
        return stored ? JSON.parse(stored) : [];
    } catch {
        return [];
    }
};

const saveWishlistToStorage = (items: WishlistItem[]) => {
    localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(items));
};

export const WishlistProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [items, setItems] = useState<WishlistItem[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    // Load wishlist from storage on mount
    useEffect(() => {
        const stored = getStoredWishlist();
        setItems(stored);
    }, []);

    // Save wishlist to storage whenever it changes
    useEffect(() => {
        saveWishlistToStorage(items);
    }, [items]);

    const addToWishlist = (productId: string) => {
        const product = mockProducts.find(p => p._id === productId);
        if (!product) {
            toast.error('Product not found');
            return;
        }

        if (items.some(item => item.productId === productId)) {
            toast.info('Already in wishlist');
            return;
        }

        const newItem: WishlistItem = {
            _id: `wishlist-${Date.now()}`,
            productId: product._id,
            name: product.name,
            image: product.image,
            price: product.price,
            category: product.categoryName
        };

        setItems(prev => [...prev, newItem]);
        toast.success('Added to wishlist');
    };

    const removeFromWishlist = (productId: string) => {
        setItems(prev => prev.filter(item => item.productId !== productId));
        toast.success('Removed from wishlist');
    };

    const isInWishlist = (productId: string) => {
        return items.some(item => item.productId === productId);
    };

    const clearWishlist = () => {
        setItems([]);
        toast.success('Wishlist cleared');
    };

    return (
        <WishlistContext.Provider
            value={{
                items,
                isLoading,
                addToWishlist,
                removeFromWishlist,
                isInWishlist,
                clearWishlist
            }}
        >
            {children}
        </WishlistContext.Provider>
    );
};

export const useWishlist = () => {
    const context = useContext(WishlistContext);
    if (!context) {
        throw new Error('useWishlist must be used within a WishlistProvider');
    }
    return context;
};

export default WishlistContext;
