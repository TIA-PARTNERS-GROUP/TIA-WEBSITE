import Router from 'express';
import { signup, verifyEmail, resendVerification, login, refresh, logout, forgotPassword, resetPassword } from '../controllers/authController.js';   
import { verifyRefreshToken } from '../middleware/authTolkien.js';

const router = Router();

// JOSHUA - FOR EACH ROUTE IMPLEMENT A SWAGGER SCHEMA FOLLOW BELOW
/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *     cookieAuth:
 *       type: apiKey
 *       in: cookie
 *       name: refreshToken
 * 
    
 */


/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *               - firstName
 *               - lastName
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: strongPassword123
 *               firstName:
 *                 type: string
 *                 example: John
 *               lastName:
 *                 type: string
 *                 example: Doe
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 email:
 *                   type: string
 *                   example: user@example.com
 *                 firstName:
 *                   type: string
 *                   example: John
 *                 lastName:
 *                   type: string
 *                   example: Doe
 *       409:
 *         description: Requested email is already in use by another user
 */


router.post('/signup', signup);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: User login
 *     tags:
 *         - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: mysecretpassword
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Login successful
 *                 token:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *       401:
 *         description: Invalid email or password
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Invalid email or password
 */
router.post('/login', login);

/**
 * @swagger
 * /auth/refresh:
 *   post:
 *     summary: Refresh the access token using a valid refresh token
 *     description: |
 *       Issues a new short-lived access token and rotates the refresh token.
 *       Requires a valid, non-expired refresh token stored in an HTTP-only cookie.
 *       The old refresh token will be revoked and replaced with a new one.
 *       
 *       **Security & Validation:**
 *       - Refresh token must be present in the `refreshToken` HTTP-only cookie.
 *       - Token must exist in the database and not be expired or revoked.
 *       - Token must not have been superseded (with a 30-second grace period for race conditions).
 *       
 *       On success, a new access token is returned in the JSON response and a new refresh token is set as an HTTP-only cookie.
 *     tags:
 *       - Auth
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       description: No request body is required. The refresh token is read from the `refreshToken` cookie.
 *       required: false
 *     responses:
 *       200:
 *         description: Successfully refreshed the access token.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Refresh successful
 *                 token:
 *                   type: string
 *                   description: The new short-lived JWT access token.
 *       401:
 *         description: Missing refresh token cookie.
 *         content:
 *           application/json:
 *             example:
 *               message: Refresh token missing
 *       403:
 *         description: Invalid, expired, or obsolete refresh token.
 *         content:
 *           application/json:
 *             examples:
 *               expired:
 *                 value:
 *                   message: Invalid or expired refresh token
 *               obsolete:
 *                 value:
 *                   message: Obsolete token
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             example:
 *               message: Internal server error
 */
router.post('/refresh', verifyRefreshToken, refresh)


/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: Log out the user
 *     description: >
 *       Revokes the user's refresh token session and clears the `refreshToken` cookie.  
 *       Requires a valid, active refresh token provided via HTTP-only cookie.
 *     tags:
 *       - Auth
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Successfully logged out
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Successfully logged out
 *       401:
 *         description: Refresh token missing
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Authorization header missing
 *       403:
 *         description: Invalid, expired, revoked, or obsolete refresh token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Invalid or expired refresh token
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Internal server error
 */
router.post('/logout', verifyRefreshToken, logout);

router.post('/verifyEmail', verifyEmail);

router.post('/resendVerification', resendVerification);

router.post('/forgotPassword', forgotPassword);

router.post('/resetPassword', resetPassword);

export default router;