import Router from 'express';
import { checkUserExists, getUserDetails, getMe} from '../controllers/userController.js';
import { getPosts, addPost, removePost } from '../controllers/postController.js';
import { verifyToken } from '../middleware/authTolkien.js';
import { verify } from 'crypto';

const router = Router();

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

/**
 * @swagger
 * /users/check/{email}:
 *   get:
 *     summary: Check if a user exists by email
 *     tags:
 *         - User
 *     description: Returns whether a user exists in the database based on the provided email address.
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         description: The email address to check
 *         schema:
 *           type: string
 *           format: email
 *     responses:
 *       200:
 *         description: User existence check result
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User exists
 *                 exists:
 *                   type: boolean
 *                   example: true
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Failed to process request
 */
router.get('/exists/:email', checkUserExists);

/**
 * @swagger
 * /users/me:
 *   get:
 *     summary: Get the currently authenticated user's profile
 *     description: |
 *       Returns profile details of the authenticated user.
 *       Requires a valid **Bearer** JWT access token in the `Authorization` header.
 *       
 *       The JWT is verified and decoded to obtain the user ID, which is then used to fetch user information from the database.
 *     tags:
 *       - User
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved the authenticated user's information.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Success
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 123
 *                     firstName:
 *                       type: string
 *                       example: John
 *                     lastName:
 *                       type: string
 *                       example: Doe
 *                     contactEmail:
 *                       type: string
 *                       example: john.doe@example.com
 *                     contactPhone:
 *                       type: string
 *                       example: "1555124567"
 *                     loginEmail:
 *                       type: string
 *                       example: john.doe@login.com
 *       401:
 *         description: Missing or invalid Authorization header format.
 *         content:
 *           application/json:
 *             examples:
 *               missingHeader:
 *                 value:
 *                   message: Authorization header missing
 *               invalidFormat:
 *                 value:
 *                   message: Invalid authorization format
 *       403:
 *         description: Token is invalid or expired.
 *         content:
 *           application/json:
 *             example:
 *               message: Invalid or expired token
 *       500:
 *         description: Server error while verifying token or fetching user.
 *         content:
 *           application/json:
 *             example:
 *               message: Server error verifying token
 */
router.get('/me', verifyToken, getMe);

router.get('/myposts', verifyToken, getPosts);

router.post('/addpost', verifyToken, addPost);

router.delete('/removepost', verifyToken, removePost);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get user details by ID
 *     description: Retrieves detailed information about a specific user by their unique ID.
 *     tags:
 *       - User
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique ID of the user to retrieve.
 *     responses:
 *       200:
 *         description: Successfully retrieved user details.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Success
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "123"
 *                     firstName:
 *                       type: string
 *                       example: John
 *                     lastName:
 *                       type: string
 *                       example: Doe
 *                     contactEmail:
 *                       type: string
 *                       example: john.doe@example.com
 *                     contactPhone:
 *                       type: string
 *                       example: "0123456789"
 *                     loginEmail:
 *                       type: string
 *                       example: john.login@example.com
 *       404:
 *         description: User not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User not found
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Failed to process request
 */
router.get('/:id', verifyToken, getUserDetails);


export default router;