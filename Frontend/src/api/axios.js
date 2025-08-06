import axios from 'axios';
import config from '../config';

const api = axios.create({
    baseURL: config.apiBaseUrl,
    withCredentials: true
});

// Attach access token to requests
api.interceptors.request.use(
    (cfg) => {
        const token = localStorage.getItem('token');
        if (token) {
            cfg.headers.Authorization = `Bearer ${token}`;
        }
        return cfg;
    },
    (error) => Promise.reject(error)
);

// Handle token refresh and logout
// JOSHUA: TODO - FINISH AUTHENTICATION AND AUTHORIZATION
// FOLLOWING CODE BELLOW HAS NOT BEEN TESTED
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (originalRequest?.url?.includes('/auth/refresh')) {
            localStorage.removeItem('token');
            window.location.href = '/auth?form=login';
            return Promise.reject(error);
        }

        if ((error.response?.status === 401 || error.response?.status === 403) && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const { data } = await api.post('/auth/refresh');
                localStorage.setItem('token', data.token);
                originalRequest.headers.Authorization = `Bearer ${data.token}`;
                return api(originalRequest);
            } catch (err) {
                localStorage.removeItem('token');
                window.location.href = '/auth?form=login';
                return Promise.reject(err);
            }
        }
        return Promise.reject(error);
    }
);

export default api;

// THIS IS FOR GENERAL API CALL AND HTTP client setup
// Create sperate files for other backend API calls you can refere to HTTP client here (clients like AXIOS allow for this)