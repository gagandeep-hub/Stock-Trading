import axios from 'axios';

// Create axios instance with base URL
const api = axios.create({
    baseURL: 'https://stockpilot-7nuo.onrender.com',
});

// Add request interceptor to include auth token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('authToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Add response interceptor to handle auth errors
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('authToken');
            window.location.href = 'https://stockpilot-frontend-wr6p.onrender.com/login';
        }
        return Promise.reject(error);
    }
);

export default api;
