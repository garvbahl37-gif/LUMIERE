import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { mockProducts } from '@/data/mockProducts';
import { toast } from 'sonner';

export interface CartItem {
    _id: string;
    productId: string;
    name: string;
    image: string;
    price: number;
    quantity: number;
}

export interface Cart {
    items: CartItem[];
    totalItems: number;
    totalPrice: number;
}

interface CartContextType {
    cart: Cart | null;
    items: CartItem[];
    totalItems: number;
    totalPrice: number;
    isLoading: boolean;
    addToCart: (productId: string, quantity?: number) => Promise<void>;
    updateQuantity: (itemId: string, quantity: number) => Promise<void>;
    removeFromCart: (itemId: string) => Promise<void>;
    clearCart: () => Promise<void>;
    refreshCart: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'lumiere-cart';

const getStoredCart = (): CartItem[] => {
    try {
        const stored = localStorage.getItem(CART_STORAGE_KEY);
        return stored ? JSON.parse(stored) : [];
    } catch {
        return [];
    }
};

const saveCartToStorage = (items: CartItem[]) => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
};

const calculateTotals = (items: CartItem[]) => {
    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    return { totalItems, totalPrice };
};

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    // Load cart from storage on mount
    useEffect(() => {
        const stored = getStoredCart();
        setCartItems(stored);
    }, []);

    // Save cart to storage whenever it changes
    useEffect(() => {
        saveCartToStorage(cartItems);
    }, [cartItems]);

    const { totalItems, totalPrice } = calculateTotals(cartItems);

    const cart: Cart = {
        items: cartItems,
        totalItems,
        totalPrice
    };

    const refreshCart = async () => {
        const stored = getStoredCart();
        setCartItems(stored);
    };

    const addToCart = async (productId: string, quantity = 1) => {
        setIsLoading(true);
        try {
            // Find product from mock data
            const product = mockProducts.find(p => p._id === productId);
            if (!product) {
                toast.error('Product not found');
                return;
            }

            setCartItems(prevItems => {
                const existingItem = prevItems.find(item => item.productId === productId);

                if (existingItem) {
                    // Update quantity if item exists
                    return prevItems.map(item =>
                        item.productId === productId
                            ? { ...item, quantity: item.quantity + quantity }
                            : item
                    );
                } else {
                    // Add new item
                    const newItem: CartItem = {
                        _id: `cart-${Date.now()}`,
                        productId: product._id,
                        name: product.name,
                        image: product.image,
                        price: product.price,
                        quantity
                    };
                    return [...prevItems, newItem];
                }
            });

            toast.success('Added to cart');
        } catch (error) {
            toast.error('Failed to add to cart');
        } finally {
            setIsLoading(false);
        }
    };

    const updateQuantity = async (itemId: string, quantity: number) => {
        setIsLoading(true);
        try {
            if (quantity <= 0) {
                await removeFromCart(itemId);
                return;
            }

            setCartItems(prevItems =>
                prevItems.map(item =>
                    item._id === itemId ? { ...item, quantity } : item
                )
            );
        } catch (error) {
            toast.error('Failed to update cart');
        } finally {
            setIsLoading(false);
        }
    };

    const removeFromCart = async (itemId: string) => {
        setIsLoading(true);
        try {
            setCartItems(prevItems => prevItems.filter(item => item._id !== itemId));
            toast.success('Item removed from cart');
        } catch (error) {
            toast.error('Failed to remove item');
        } finally {
            setIsLoading(false);
        }
    };

    const clearCart = async () => {
        setIsLoading(true);
        try {
            setCartItems([]);
            toast.success('Cart cleared');
        } catch (error) {
            toast.error('Failed to clear cart');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <CartContext.Provider
            value={{
                cart,
                items: cartItems,
                totalItems,
                totalPrice,
                isLoading,
                addToCart,
                updateQuantity,
                removeFromCart,
                clearCart,
                refreshCart
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};

export default CartContext;
