import api from "./axios";

export function getCurrentBusinessInfo() {
    return api.get('/business/myinfo');
};

export function updateCurrentBusinessProfile(companyName, contactName, contactPhone, contactEmail, companyDescription) {
    return api.patch('/business/update',
        { name: companyName, contactName: contactName, contactPhoneNo: contactPhone, contactEmail: contactEmail, description: companyDescription}
    );
};

export function addServices(services) {
    return api.post('/business/addservice',
        { services: services }
    );
};

export function addClients(clients) {
    return api.post('/business/addclient',
        { clients: clients }
    );
};

export function removeServices(services) {
    return api.delete('/business/removeservice', {
        data: { services: services }
    });
}

export function removeClients(clients) {
    return api.delete('/business/removeclient', {
        data: { clients: clients }
    });
}