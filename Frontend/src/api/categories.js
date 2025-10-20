import api from "./axios";

export function getCategoriesList() {
    return api.get('/getcategories');
};

export function getBusinessSkillsList() {
    return api.get('/getbusinessskills');
};

export function getSkillsList() {
  return api.get('/getskills');
};

export function getStrengthsList() {
  return api.get('/getstrengths');
};