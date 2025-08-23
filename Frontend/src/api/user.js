import api from "./axios";

export function getCurrentUserInfo() {
    return api.get('/users/me');
}