// Backend/middleware/validators/projectValidator.js
import Joi from 'joi';

const id = Joi.number().integer().min(1);

// GET /projects Query Parameters (Aligned with Swagger)
export const listProjectQuery = Joi.object({
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).max(100).default(20),

  search: Joi.string().trim().allow(''),


  categories: Joi.alternatives().try(
    Joi.string()
      .pattern(/^\d+(,\d+)*$/)
      .message('categories must be comma-separated integers like "1,2,3"'),
    Joi.array().items(id)
  ).optional(),

  skills: Joi.alternatives().try(
    Joi.string()
      .pattern(/^\d+(,\d+)*$/)
      .message('skills must be comma-separated integers like "1,2,3"'),
    Joi.array().items(id)
  ).optional(),

  regions: Joi.alternatives().try(
    Joi.string()
      .pattern(/^[A-Za-z]{2,10}(,[A-Za-z]{2,10})*$/)
      .message('regions must be comma-separated codes like "nsw,vic"'),
    Joi.array().items(Joi.string().trim().max(16))
  ).optional(),

  status: Joi.string().valid('open', 'closed').optional()
}).unknown(false);

// params: /projects/:id
export const projectIdParams = Joi.object({
  id: id.required()
});

// POST /projects 
export const createProjectSchema = Joi.object({
  name: Joi.string().trim().min(1).max(120).required(),
  description: Joi.string().trim().min(1).max(5000).required(),

  status: Joi.string().valid('open', 'closed').default('open'),

  openDate: Joi.date().iso().optional().allow(null),
  closeDate: Joi.date().iso().optional().allow(null),
  completionDate: Joi.date().iso().optional().allow(null),

  categoryIds: Joi.array().items(id).optional(),
  skillIds: Joi.array().items(id).optional(),
  regions: Joi.array().items(Joi.string().trim().max(16)).optional()
}).unknown(false);

// PATCH /projects/:id 
export const updateProjectBody = Joi.object({
  name: Joi.string().trim().min(1).max(120),
  description: Joi.string().trim().min(1).max(5000),

  status: Joi.string().valid('open', 'closed'),

  openDate: Joi.date().iso().allow(null),
  closeDate: Joi.date().iso().allow(null),
  completionDate: Joi.date().iso().allow(null),

  categoryIds: Joi.array().items(id),
  skillIds: Joi.array().items(id),
  regions: Joi.array().items(Joi.string().trim().max(16))
}).min(1).unknown(false);

// POST /projects/:id/applicants  
export const applicantParams = Joi.object({
  id: id.required()
});

// DELETE /projects/:id/applicants/:userId
export const removeApplicantParams = Joi.object({
  id: id.required(),
  userId: id.required()
});
