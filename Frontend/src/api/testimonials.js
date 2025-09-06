import api from "./axios";

export function getCurrentUserTestimonials() {
    return api.get('/users/mytestimonials');
};

export function addTestimonial(title, date, content, status) {
    return api.post('/users/addtestimonial',
        { title: title, date: date, content: content, status: status }
    );
};

export function publishTestimonial(id) {
    return api.post('/users/publishtestimonial',
        { id: id }
    );
};

export function removeTestimonial(id) {
    return api.delete('/users/removetestimonial', {
        data: { id: id }
    });
}