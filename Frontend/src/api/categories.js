import api from "./axios";

export function getCategoriesList() {
    return api.get('/category/getcategories');
};