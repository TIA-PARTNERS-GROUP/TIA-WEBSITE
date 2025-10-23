import db from "../config/db.js";
import categoryModel from '../models/category.js';
import skillModel from '../models/skill.js';
import projectModel from '../models/project.js';
export const addProject = async (req, res) => {
    try {
        const category = categoryModel(db);
        const skill = skillModel(db);
        const project = projectModel(db);
        const {
            name,
            description,
            status = 'closed',
            openDate = null,
            closeDate = null,
            completionDate = null,
            categoryIds = [],
            skillIds = [],
            regions = []
        } = req.body;

        if (!'name' in req.body) {
            return res.status(400).json({message: "Name is required"});
        }

        if (!'description' in req.body) {
            return res.status(400).json({message: "Description is required"});
        }

        if (!['open', 'closed'].includes(status)) {
            return res.status(400).json({message: "Status must be 'open' or 'closed'"})
        }

        // Ensure all the ids provided are valid
        for (const categoryId of categoryIds) {
            if (!category.getBusinessCategoryById(categoryId)) {
                return res.status(404).json({message: `No category with id of ${categoryId}`});
            }
        }

        for (const skillId of skillIds) {
            if (!skill.getSkillById(skillId)) {
                return res.status(404).json({message: `No skill with id of ${skillId}`});
            }
        }
        

        // In the unlikely event that tasmania secedes, this will need to be updated
        for (const region of regions) {
            if (!["qld", "nsw", "vic", "wa", "sa", "tas", "nt", "act"].includes(region)) {
                return res.status(404).json({message: `Region ${region} not supported`});
            }
        }
        const parseToMySQLDate = (value) => {
            if (value === null || value === undefined) return null;
            if (typeof value !== 'string') return false;

            const d = new Date(value);
            if (Number.isNaN(d.getTime())) return false;

            const yyyy = d.getUTCFullYear();
            const mm = String(d.getUTCMonth() + 1).padStart(2, '0');
            const dd = String(d.getUTCDate()).padStart(2, '0');
            return `${yyyy}-${mm}-${dd}`;
        };

        // Validate and convert date fields: must be null or an ISO8601-parsable string
        const convertedOpenDate = (openDate === null) ? null : parseToMySQLDate(openDate);
        if (convertedOpenDate === false) return res.status(400).json({message: 'openDate must be null or a valid ISO8601 date string'});

        const convertedCloseDate = (closeDate === null) ? null : parseToMySQLDate(closeDate);
        if (convertedCloseDate === false) return res.status(400).json({message: 'closeDate must be null or a valid ISO8601 date string'});

        const convertedCompletionDate = (completionDate === null) ? null : parseToMySQLDate(completionDate);
        if (convertedCompletionDate === false) return res.status(400).json({message: 'completionDate must be null or a valid ISO8601 date string'});

        const projectId = await project.addProject(name, description, req.user.id, status, convertedOpenDate, convertedCloseDate, convertedCompletionDate,
            categoryIds, skillIds, regions);

        return res.status(201).json({projectId: projectId})
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({error: "Internal server error"});
    }
   
}

export const getProject = async (req, res) => {
    const project = projectModel(db);
    try {
        const id = req.params.id;
        const projectData = await project.getProjectById(id);

        if (!projectData) {
            return res.status(404).json({message: "No project with that id"});
        }

        return res.status(200).json({project: projectData});
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({error: "Internal server error"});
    }
}

export const addApplicant = async (req, res) => {
    const project = projectModel(db);
    try {
        const projectId = req.params.id;
        const projectInfo = await project.getProjectById(projectId);
        if (!projectInfo) {
            return res.status(404).json({message: "No project with that id"});
        }

        const applicantAdded = await project.addApplicant(projectId, req.user.id);
        if (!applicantAdded) {
            return res.status(409).json({message: "Applicant already added"});
        }
        return res.status(201).json({message: "Applicant added"});
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({error: "Internal server error"});
    }
}

export const updateProject = async (req, res) => {
    try {
        const project = projectModel(db);
        const projectId = req.params.id;

        if (!projectId) {
            return res.status(400).json({ message: 'No project id provided' });
        }

        const projectInfo = await project.getProjectById(projectId);
        if (!projectInfo) {
            return res.status(404).json({ message: 'No project with that id' });
        }

        // Verify the requesting user manages this project
        if (projectInfo.managed_by_user_id !== req.user.id) {
            return res.status(403).json({ message: 'You can only update projects you manage' });
        }

        try {
            await project.updateProject(projectId, req.body);
        } catch (error) {
            return res.status(400).json({ message: 'Bad request' });
        }

        return res.status(201).json({ message: 'Project updated' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

export const deleteProject = async (req, res) => {
    try {
        const project = projectModel(db);
        const projectId = req.params.id;

        if (!projectId) {
            return res.status(400).json({ message: 'No project id provided' });
        }

        const projectInfo = await project.getProjectById(projectId);
        if (!projectInfo) {
            return res.status(404).json({ message: 'No project with that id' });
        }

        if (projectInfo.managed_by_user_id !== req.user.id) {
            return res.status(403).json({ message: 'You can only delete projects you manage' });
        }

        const rowsAffected = await project.deleteProject(projectId);
        if (!rowsAffected) {
            return res.status(404).json({ message: 'No project with that id' });
        }

        return res.status(200).json({ message: 'Project deleted' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

export const getMyProjects = async (req, res) => {
    try {
        const project = projectModel(db);
        const userId = req.user.id;

        const projects = await project.getProjectsByManagerId(userId);

        return res.status(200).json({ message: 'Success', projects });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

export const getAppliedProjects = async (req, res) => {
    try {
        const project = projectModel(db);
        const userId = req.user.id;

        const projects = await project.getProjectsByApplicantId(userId);

        return res.status(200).json({ message: 'Success', projects });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

export const getProjects = async (req, res) => {
    try {
        const project = projectModel(db);

        const page = parseInt(req.query.page, 10) || 1;
        const limit = parseInt(req.query.limit, 10) || 20;
        const search = req.query.search || '';
        const status = req.query.status || null;

        const parseList = (val, forceString = false) => {
            if (!val) return [];
            if (Array.isArray(val)) return val.map(x => forceString ? String(x).trim() : (isNaN(parseInt(x,10)) ? x : parseInt(x,10)));
            return val.split(',').map(x => forceString ? String(x).trim() : (isNaN(parseInt(x,10)) ? x.trim() : parseInt(x,10)));
        }

        const categories = parseList(req.query.categories, false);
        const skills = parseList(req.query.skills, false);
        const regions = parseList(req.query.regions, true); // region codes (e.g., 'nsw', 'vic')

        const result = await project.getPaginated(page, limit, categories, skills, regions, status, search);

        return res.status(200).json({ message: 'Success', data: result.data, pagination: result.pagination });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

export const removeApplicant = async (req, res) => {
    const project = projectModel(db);
    try {
        const projectId = req.params.id;
        const userId = req.params.userId;
        
        const projectInfo = await project.getProjectById(projectId);
        if (!projectInfo) {
            return res.status(404).json({message: "No project with that id"});
        }

        // Verify the requesting user manages this project
        if (projectInfo.managed_by_user_id !== req.user.id) {
            return res.status(403).json({ message: 'You can only remove applicants from projects you manage' });
        }

        const rowsAffected = await project.removeApplicant(projectId, userId);
        if (!rowsAffected) {
            return res.status(404).json({message: "Applicant not found for this project"});
        }
        
        return res.status(200).json({message: "Applicant removed"});
    } catch (error) {
        console.log(error);
        return res.status(500).json({error: "Internal server error"});
    }
}