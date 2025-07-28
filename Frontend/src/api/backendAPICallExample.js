import api from './axios';

export const getBackendAPI = async (formdata) => {
    try {
        const res = await api.get('/test');
        return res.data;
    } catch (error) {
        console.error('Test call failed:', error);
        throw error;
    }
};