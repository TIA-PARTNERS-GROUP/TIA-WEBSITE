import api from "./axios";

export function getCurrentBusinessInfo() {
    return api.get('/business/myinfo');
}

export function updateCurrentBusinessProfile(companyName, contactName, contactPhone, contactEmail, companyDescription) {
    return api.patch('/business/update',
                    { name: companyName, contactName: contactName, contactPhoneNo: contactPhone, contactEmail: contactEmail, description: companyDescription}
                );
}