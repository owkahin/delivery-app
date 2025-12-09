import axios, { AxiosInstance } from 'axios';
import { API_URL } from '../constants/colors';

const api: AxiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const setAuthToken = (token: string | null) => {
  if (token) {
    api.defaults.headers.common['x-auth-token'] = token;
  } else {
    delete api.defaults.headers.common['x-auth-token'];
  }
};

export const authAPI = {
  login: (email: string, password: string) => 
    api.post('/auth/login', { email, password }),
  register: (name: string, email: string, password: string) => 
    api.post('/auth/register', { name, email, password }),
};

export const restaurantAPI = {
  getAll: (search: string = '') => 
    api.get(`/restaurants?search=${search}`),
  getById: (id: string) => 
    api.get(`/restaurants/${id}`),
  getMenu: (id: string) => 
    api.get(`/restaurants/${id}/menu`),
};

interface OrderData {
  items: Array<{ name: string; quantity: number; price: number }>;
  total: number;
  deliveryAddress: string;
}

export const orderAPI = {
  create: (orderData: OrderData) => 
    api.post('/orders', orderData),
  getAll: () => 
    api.get('/orders'),
  getById: (id: string) => 
    api.get(`/orders/${id}`),
};

export const categoryAPI = {
  getAll: () => api.get('/categories'),
};

export default api;
