import Joi from 'joi';
export const userIdParams = Joi.object({ user_id: Joi.number().integer().min(1).required() });
export const projectIdParams = Joi.object({ project_id: Joi.number().integer().min(1).required() });
