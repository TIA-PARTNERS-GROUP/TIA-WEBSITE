import axios from 'axios';
import config from '../config';

const api = axios.create({
    baseURL: config.apiBaseUrl, // should be '/api'
    withCredentials: true
});

// Attach access token to requests
api.interceptors.request.use(
    (cfg) => {
        const token = sessionStorage.getItem('token');
        if (token) {
            cfg.headers.Authorization = `Bearer ${token}`;
        }
        return cfg;
    },
    (error) => Promise.reject(error)
);

// Handle token refresh and logout
console.log()
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // Prevent infinite loop if refresh fails
        if (originalRequest?.url?.includes('/auth/refresh')) {
            sessionStorage.removeItem('token');
            window.location.href = '/login';
            return Promise.reject(error);
        }

        // Attempt refresh if unauthorized and not already retried
        if ((error.response?.status === 401 || error.response?.status === 403) && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const { data } = await api.post('/auth/refresh');
                // Use 'token' or 'accessToken' depending on your backend's response
                const newToken = data.token || data.accessToken;
                sessionStorage.setItem('token', newToken);
                originalRequest.headers.Authorization = `Bearer ${newToken}`;
                return api(originalRequest);
            } catch (err) {
                sessionStorage.removeItem('token');
                window.location.href = '/login';
                return Promise.reject(err);
            }
        }
        return Promise.reject(error);
    }
);

export default api;