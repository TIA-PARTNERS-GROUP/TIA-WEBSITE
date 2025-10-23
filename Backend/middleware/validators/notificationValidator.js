import Joi from 'joi';

export const listQuery = Joi.object({
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).max(100).default(10)
});

export const addNotificationSchema = Joi.object({
  title: Joi.string().trim().min(1).max(200).required(),
  body: Joi.string().trim().min(1).max(5000).required(),
  type: Joi.string().valid('info','warning','success').default('info'),
  meta: Joi.object().unknown(true).optional()
});

export const removeNotificationSchema = Joi.object({
  id: Joi.number().integer().min(1).required()
});

export const setOpenedSchema = Joi.object({
  id: Joi.number().integer().min(1).required(),
  opened: Joi.boolean().default(true)
});
