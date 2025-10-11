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