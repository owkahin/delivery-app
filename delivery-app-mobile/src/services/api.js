import axios from 'axios';
import { API_URL } from '../constants/colors';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const setAuthToken = (token) => {
    if (token) {
        api.defaults.headers.common['x-auth-token'] = token;
    } else {
        delete api.defaults.headers.common['x-auth-token'];
    }
};

export const authAPI = {
    login: (email, password) => api.post('/auth/login', { email, password }),
    register: (name, email, password) => api.post('/auth/register', { name, email, password }),
};

export const restaurantAPI = {
    getAll: (search = '') => api.get(`/restaurants?search=${search}`),
    getById: (id) => api.get(`/restaurants/${id}`),
    getMenu: (id) => api.get(`/restaurants/${id}/menu`),
};

export const orderAPI = {
    create: (orderData) => api.post('/orders', orderData),
    getAll: () => api.get('/orders'),
    getById: (id) => api.get(`/orders/${id}`),
};

export const categoryAPI = {
    getAll: () => api.get('/categories'),
};

export default api;
