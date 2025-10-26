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

const phoneNumber = Joi.string()
  .min(5)
  .max(30)
  .pattern(/^[+\d\s()-]+$/)
  .required()
  .messages({
    'string.pattern.base': 'Phone number format is invalid',
    'string.min': 'Phone number must be at least 5 characters long',
    'string.max': 'Phone number cannot exceed 30 characters'
  });

// POST /signup
export const signupSchema = Joi.object({
  email: Joi.string().email().required(),
  password: strongPassword.required(),
  firstName: Joi.string().min(1).max(100).required(),
  lastName: Joi.string().min(1).max(100).required(),
  company: Joi.string().min(1).max(255).required()
    .messages({
      'string.min': 'Business name is required',
      'string.max': 'Business name cannot exceed 255 characters'
    }),
  category: Joi.number().integer().min(1).required()
    .messages({
      'number.base': 'Business category ID must be a number',
      'number.min': 'Business category ID is required'
    }),
  phone: phoneNumber,
  description: Joi.string().min(10).max(1000).required()
    .messages({
      'string.min': 'Business description must be at least 10 characters long',
      'string.max': 'Business description cannot exceed 1000 characters'
    })
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
