import Joi from 'joi';

export const chatMessageSchema = Joi.object({
  message: Joi.string().trim().min(1).max(5000).required(),
  conversationId: Joi.number().integer().min(1).optional(),
  options: Joi.object().unknown(true).optional()
});

export const resetSchema = Joi.object({
  conversationId: Joi.number().integer().min(1).optional()
}).unknown(false);
