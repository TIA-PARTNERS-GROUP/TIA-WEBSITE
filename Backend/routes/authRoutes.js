import Router from 'express';
import { signup, verifyEmail, resendVerification, login, logout, forgotPassword, resetPassword } from '../controllers/authController'

const router = Router();

// JOSHUA - FOR EACH ROUTE IMPLEMNT A SWAGGER SCHEMA FOLLOW THE BELLOW
/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

// TODO: ADD SWAGGER SCHEMA
router.post('/signup', signup);

// TODO: ADD SWAGGER SCHEMA
router.post('/verifyEmail', verifyEmail);

// TODO: ADD SWAGGER SCHEMA
router.post('/resendVerification', resendVerification);

// TODO: ADD SWAGGER SCHEMA
router.post('/login', login);

// TODO: ADD SWAGGER SCHEMA
router.post('/logout', logout);

// TODO: ADD SWAGGER SCHEMA
router.post('/forgotPassword', forgotPassword);

// TODO: ADD SWAGGER SCHEMA
router.post('/resetPassword', resetPassword);