import Joi from 'joi';

export const submitFeedbackSchema = Joi.object({
  message: Joi.string().trim().min(1).max(3000).required(),
  email: Joi.string().email().optional(),
  rating: Joi.number().integer().min(1).max(5).optional(),
  meta: Joi.object().unknown(true).optional()
});
