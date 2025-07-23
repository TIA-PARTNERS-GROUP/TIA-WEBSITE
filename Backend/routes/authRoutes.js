import Router from 'express';
import { signup, verifyEmail, resendVerification, login, logout, forgotPassword, resetPassword } from '../controllers/authController.js'

const router = Router();

// JOSHUA - FOR EACH ROUTE IMPLEMNT A SWAGGER SCHEMA FOLLOW BELLOW
/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

router.post('/signup', signup);

router.post('/verifyEmail', verifyEmail);

router.post('/resendVerification', resendVerification);

router.post('/login', login);

router.post('/logout', logout);

router.post('/forgotPassword', forgotPassword);

router.post('/resetPassword', resetPassword);

export default router;