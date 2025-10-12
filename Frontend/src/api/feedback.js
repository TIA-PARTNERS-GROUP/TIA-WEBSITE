import api from './axios';

export function addFeedback(name, email, content) {
    return api.post('/feedback',
        { name: name, email: email, content: content }
    );
};