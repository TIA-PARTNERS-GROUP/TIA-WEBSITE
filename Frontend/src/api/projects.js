import api from "./axios";

export function queryProjects(page = 1, limit = 10, search = null, categories = null, skills = null, regions = null, status = null) {
    return api.get('/projects', {
        params: {
            page,
            limit,
            ...(search && { search }), // Only include search if not null
            ...(categories && { categories }),
            ...(skills && { skills }),
            ...(regions && { regions }),
            ...(status && { status })
        }
    });
};

export function addProject(name, description, status, openDate, closeDate, completionDate, categoryIds, skillIds, regions) {
    return api.post('/projects',
        { 
            name: name, 
            description: description, 
            status: status, 
            openDate: openDate, 
            closeDate: closeDate, 
            completionDate: completionDate, 
            categoryIds: categoryIds, 
            skillIds: skillIds, 
            regions: regions 
        }
    );
};