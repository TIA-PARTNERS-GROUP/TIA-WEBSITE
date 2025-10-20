import api from "./axios";

export function getCurrentUserInfo() {
    return api.get('/users/me');
}

export function getUserInfoById(userId) {
    return api.get(`/users/${userId}`);
}