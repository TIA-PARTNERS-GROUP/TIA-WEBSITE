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

export function getMyProjects() {
    return api.get('/projects/my');
};

export function getAppliedProjects() {
    return api.get('/projects/applied');
};

export function deleteProject(projectId) {
    return api.delete(`/projects/${projectId}`)
}

export function addApplicant(projectId) {
    return api.post(`/projects/${projectId}/applicants`)
}

export function removeApplicant(projectId, userId) {
    return api.delete(`/projects/${projectId}/applicants/${userId}`)
}

export function closeProject(projectId) {
    return api.patch(`/projects/${projectId}`,
        { 
            status: "closed"
        }
    ); 
}

export function getProjectDetails(projectId) {
    return api.get(`/projects/${projectId}`)
}

export function updateProject(projectId, editedProject) {
    const regionMap = {
        'queensland': 'qld',
        'new south wales': 'nsw', 
        'victoria': 'vic',
        'western australia': 'wa',
        'south australia': 'sa',
        'tasmania': 'tas',
        'northern territory': 'nt',
        'australian capital territory': 'act'
    };

    // Process category IDs
    const categoryIds = [];
    if (editedProject.categoryId) {
        categoryIds.push(parseInt(editedProject.categoryId));
    }

    // Process skill IDs - FIX: Filter out null values and extract IDs
    const skillIds = [];
    if (Array.isArray(editedProject.skillIds)) {
        editedProject.skillIds
            .filter(skill => skill !== null && skill !== undefined) // Remove nulls
            .forEach(skill => {
                if (typeof skill === 'object' && skill.id) {
                    const id = parseInt(skill.id);
                    if (!isNaN(id)) skillIds.push(id);
                } else if (typeof skill === 'number') {
                    skillIds.push(skill);
                }
            });
    }

    // Process regions
    const regions = [];
    if (Array.isArray(editedProject.regions)) {
        editedProject.regions.forEach(region => {
            if (region && typeof region === 'string') {
                const regionLower = region.toLowerCase();
                regions.push(regionMap[regionLower] || regionLower);
            }
        });
    }

    console.log('Processed data for update - skillIds:', skillIds);

    return api.patch(`/projects/${projectId}`,
        { 
            name: editedProject.title,
            description: editedProject.description,
            status: editedProject.status,
            categoryIds: categoryIds.length > 0 ? categoryIds : null,
            skillIds: skillIds.length > 0 ? skillIds : null, // This will now be [] instead of [null]
            regions: regions.length > 0 ? regions : null,
            openDate: editedProject.openDate || null,
            closeDate: editedProject.closeDate || null,
            completionDate: editedProject.completionDate || null
        }
    ); 
}
