import Joi from 'joi';

export const chatMessageSchema = Joi.object({
  user_id: Joi.number().integer().required(),
  name: Joi.string().trim().required(),
  message: Joi.string().trim().min(1).max(5000).required(),
  chat_type: Joi.string().optional(),
  session_id: Joi.string().optional().allow(null),
  region: Joi.string().required(),
  lat: Joi.number().required(),
  lng: Joi.number().required(),
  save_conversation: Joi.boolean().optional()
});

export const resetSchema = Joi.object({
  conversationId: Joi.number().integer().min(1).optional()
}).unknown(false);
