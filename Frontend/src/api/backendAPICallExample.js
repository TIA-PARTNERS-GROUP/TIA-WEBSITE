import api from './axios';

export const getBackendAPI = async (formdata) => {
    try {
        const res = await api.post('/your-endpoint', formdata);
        return res.data;
    } catch (error) {
        console.error('Error getting backend API:', error);
        throw error;
    }
};