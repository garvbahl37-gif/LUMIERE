import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add interceptor for auth token (placeholder for when we add Auth)
api.interceptors.request.use(
    (config) => {
        // const token = localStorage.getItem('admin_token');
        // if (token) {
        //     config.headers.Authorization = `Bearer ${token}`;
        // }
        return config;
    },
    (error) => Promise.reject(error)
);

export const productService = {
    getAll: async () => {
        const response = await api.get('/products');
        return response.data;
    },
    create: async (data: any) => {
        const response = await api.post('/products', data);
        return response.data;
    },
    update: async (id: string, data: any) => {
        const response = await api.put(`/products/${id}`, data);
        return response.data;
    },
    delete: async (id: string) => {
        const response = await api.delete(`/products/${id}`);
        return response.data;
    },
};


export const orderService = {
    getAll: async () => {
        const response = await api.get('/orders/admin/all');
        return response.data;
    },
};

export const userService = {
    getAll: async () => {
        const response = await api.get('/auth/users');
        return response.data;
    },
};

export default api;
