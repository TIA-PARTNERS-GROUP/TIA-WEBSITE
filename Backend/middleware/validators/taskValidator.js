// Backend/middleware/validators/taskValidator.js
import Joi from 'joi';

const id = Joi.number().integer().min(1);

// basic params
export const taskIdParams   = Joi.object({ taskId: id.required() });
export const userIdParams   = Joi.object({ userId: id.required() });

// Combination params
export const enrollParams   = Joi.object({ taskId: id.required(), userId: id.required() });
export const unenrollParams = Joi.object({ taskId: id.required(), userId: id.required() });

// Progress-related parameters（YYYY-MM-DD）
export const progressParamsTask = Joi.object({
  userId: id.required(),
  taskId: id.required(),
  date: Joi.string().pattern(/^\d{4}-\d{2}-\d{2}$/).required()
});

export const progressParamsDaily = Joi.object({
  userId: id.required(),
  date: Joi.string().pattern(/^\d{4}-\d{2}-\d{2}$/).required()
});

// Update Progress body
export const progressBody = Joi.object({
  progress: Joi.number().integer().min(0).max(100).required()
});
