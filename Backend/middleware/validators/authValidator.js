// Backend/middleware/validators/authValidator.js
import Joi from 'joi';

// Strong password pattern: at least 6 characters, one uppercase letter, one number
const strongPassword = Joi.string()
  .min(6)
  .max(128)
  .pattern(/^(?=.*[A-Z])(?=.*\d).*$/)
  .messages({
    'string.min': 'Password must be at least 6 characters long',
    'string.pattern.base': 'Password must include at least one uppercase letter and one number'
  });

// POST /signup
export const signupSchema = Joi.object({
  email: Joi.string().email().required(),
  password: strongPassword.required(),
  firstName: Joi.string().min(1).max(100).required(),
  lastName: Joi.string().min(1).max(100).required(),
});

// POST /login
export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(128).required()
});

// POST /verifyEmail  
export const verifyEmailSchema = Joi.object({
  token: Joi.string().min(10).required()
});

// POST /resendVerification 
export const resendVerificationSchema = Joi.object({
  email: Joi.string().email().required()
});

// POST /forgotPassword 
export const forgotPasswordSchema = Joi.object({
  email: Joi.string().email().required()
});

// POST /resetPassword 
export const resetPasswordSchema = Joi.object({
  token: Joi.string().min(10).required(),
  password: strongPassword.required()
});
