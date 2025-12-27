import api from './api';

export interface OrderItem {
    product: string;
    name: string;
    image: string;
    price: number;
    quantity: number;
}

export interface ShippingAddress {
    fullName: string;
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    phone: string;
}

export interface Order {
    _id: string;
    orderNumber: string;
    user: string;
    items: OrderItem[];
    shippingAddress: ShippingAddress;
    paymentMethod: 'card' | 'paypal' | 'cod';
    paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
    itemsPrice: number;
    shippingPrice: number;
    taxPrice: number;
    totalPrice: number;
    status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
    paidAt?: string;
    deliveredAt?: string;
    trackingNumber?: string;
    createdAt: string;
    updatedAt: string;
}

export interface OrdersResponse {
    success: boolean;
    data: Order[];
}

export interface CreateOrderData {
    shippingAddress: ShippingAddress;
    paymentMethod: 'card' | 'paypal' | 'cod';
}

export const orderService = {
    async getOrders(): Promise<OrdersResponse> {
        const response = await api.get('/orders');
        return response.data;
    },

    async getOrder(id: string): Promise<{ success: boolean; data: Order }> {
        const response = await api.get(`/orders/${id}`);
        return response.data;
    },

    // Public tracking - no auth required
    async trackOrder(id: string): Promise<{ success: boolean; data: Order }> {
        const response = await api.get(`/orders/track/${id}`);
        return response.data;
    },

    async createOrder(data: CreateOrderData): Promise<{ success: boolean; data: Order }> {
        const response = await api.post('/orders', data);
        return response.data;
    },

    async updatePaymentStatus(orderId: string): Promise<{ success: boolean; data: Order }> {
        const response = await api.put(`/orders/${orderId}/pay`);
        return response.data;
    }
};

export default orderService;
