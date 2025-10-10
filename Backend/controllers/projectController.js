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
            if (!category.getCategoryById(categoryId)) {
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