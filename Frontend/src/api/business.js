import api from "./axios";

export function queryBusinesses(page = 1, limit = 10, search = null, categories = null) {
    return api.get('/business/query', {
        params: {
            page,
            limit,
            ...(search && { search }), // Only include search if not null
            ...(categories && { categories })
        }
    });
};

export function getCurrentBusinessInfo() {
    return api.get('/business/myinfo');
};

export function updateCurrentBusinessProfile(companyName, contactName, contactPhone, contactEmail, companyDescription, categoryId) {
    return api.patch('/business/update',
        { name: companyName, contactName: contactName, contactPhoneNo: contactPhone, contactEmail: contactEmail, description: companyDescription, businessCategory: categoryId}
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

export function addConnection(initiatingBusinessId, receivingBusinessId) {
    return api.post('/business/addconnection',
        { initiatingBusinessId: initiatingBusinessId, receivingBusinessId: receivingBusinessId }
    );
};

export function removeConnection(id) {
    return api.delete('/business/removeconnection', {
        data: { id: id }
    });
}

export function getOtherBusinessInfo(id) {
    return api.get(`/business/${id}`);
};