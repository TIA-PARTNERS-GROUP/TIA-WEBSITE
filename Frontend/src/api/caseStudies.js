import api from "./axios";

export function getCurrentUserCaseStudies() {
    return api.get('/users/mycasestudies');
};

export function addCaseStudy(title, date, content, status) {
    return api.post('/users/addcasestudy',
        { title: title, date: date, content: content, status: status }
    );
};

export function publishCaseStudy(id) {
    return api.post('/users/publishcasestudy',
        { id: id }
    );
};

export function removeCaseStudy(id) {
    return api.delete('/users/removecasestudy', {
        data: { id: id }
    });
}

