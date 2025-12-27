import api from './api';

export interface CartItem {
    _id: string;
    product: string;
    name: string;
    image: string;
    price: number;
    quantity: number;
}

export interface Cart {
    _id: string;
    user: string;
    items: CartItem[];
    totalItems: number;
    totalPrice: number;
}

export interface CartResponse {
    success: boolean;
    data: Cart;
}

export const cartService = {
    async getCart(): Promise<CartResponse> {
        const response = await api.get('/cart');
        return response.data;
    },

    async addToCart(productId: string, quantity = 1): Promise<CartResponse> {
        const response = await api.post('/cart', { productId, quantity });
        return response.data;
    },

    async updateCartItem(itemId: string, quantity: number): Promise<CartResponse> {
        const response = await api.put(`/cart/${itemId}`, { quantity });
        return response.data;
    },

    async removeFromCart(itemId: string): Promise<CartResponse> {
        const response = await api.delete(`/cart/${itemId}`);
        return response.data;
    },

    async clearCart(): Promise<CartResponse> {
        const response = await api.delete('/cart');
        return response.data;
    }
};

export default cartService;
