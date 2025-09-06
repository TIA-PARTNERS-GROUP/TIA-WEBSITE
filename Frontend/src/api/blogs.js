import api from "./axios";

export function getCurrentUserBlogs() {
    return api.get('/users/myposts');
};

export function addBlog(title, date, content, status) {
    return api.post('/users/addpost',
        { title: title, date: date, content: content, status: status }
    );
};

export function publishBlog(id) {
    return api.post('/users/publishpost',
        { id: id }
    );
};

export function removeBlog(id) {
    return api.delete('/users/removepost', {
        data: { id: id }
    });
}