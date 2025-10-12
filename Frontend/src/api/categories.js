import api from "./axios";

export function getCategoriesList() {
    return api.get('/getcategories');
};

export function getSkillsList() {
    return api.get('/getskills');
};