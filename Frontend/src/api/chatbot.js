import api from './axios';

// Send a message to the ADK agent
export const sendChatbotMessage = async ({ user_id, name, message, chat_type, region, lat, lng}) => {
    try {
        const res = await api.post('/chatbot/message', { user_id, name, message, chat_type, region, lat, lng });
        console.log(res)
        return res.data;
    } catch (error) {
        console.error('Chatbot call failed:', error);
        throw error;
    }
};

export const resetChatbot = async () => {
    try {
        const res = await api.post('/chatbot/reset');
        return res.data;
    } catch (error) {
        console.error('Chatbot reset failed:', error);
        throw error;
    }
};