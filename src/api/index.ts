// src/api/index.ts
import axios from 'axios';

const api = axios.create({
    baseURL:
        'https://app.swaggerhub.com/apis-docs/goodwell/my-external_api/1.0.0',
    timeout: 1000,
});

// Add token to requests
api.interceptors.request.use((config) => {
    const token = sessionStorage.getItem('jwt_token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Handle auth errors
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            sessionStorage.removeItem('jwt_token');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default api;
