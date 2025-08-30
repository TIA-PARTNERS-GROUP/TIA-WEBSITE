import Router from 'express';
import { checkUserExists, getUserDetails, getMe} from '../controllers/userController.js';
import { getUserPosts, getMyPosts, addPost, removePost, publishPost } from '../controllers/postController.js';
import { verifyToken } from '../middleware/authTolkien.js';

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

/**
 * @swagger
 * /users/myposts:
 *   get:
 *     summary: Get posts created by the authenticated user
 *     description: Returns all posts authored by the currently authenticated user. Requires a valid Bearer JWT token.
 *     tags:
 *       - Posts
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved user's posts.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 posts:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       postedBy:
 *                         type: integer
 *                       title:
 *                         type: string
 *                       content:
 *                         type: string
 *                       status:
 *                         type: string
 *                         enum: [published, draft]
 *       401:
 *         description: Unauthorized or missing token.
 *       500:
 *         description: Internal server error.
 */
router.get('/myposts', verifyToken, getMyPosts);

/**
 * @swagger
 * /users/addpost:
 *   post:
 *     summary: Add a new post for the authenticated user
 *     description: Creates a new post for the authenticated user. Requires a valid Bearer JWT token.
 *     tags:
 *       - Posts
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - date
 *               - content
 *               - status
 *             properties:
 *               title:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date-time
 *               content:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum: [published, draft]
 *     responses:
 *       201:
 *         description: Post created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 postId:
 *                   type: integer
 *       400:
 *         description: Missing or invalid fields.
 *       401:
 *         description: Unauthorized or missing token.
 *       500:
 *         description: Internal server error.
 */
router.post('/addpost', verifyToken, addPost);

/**
 * @swagger
 * /users/publishpost:
 *   post:
 *     summary: Publish an existing post
 *     description: Publishes a draft post for the authenticated user. Requires a valid Bearer JWT token.
 *     tags:
 *       - Posts
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *             properties:
 *               id:
 *                 type: integer
 *                 description: The ID of the post to publish.
 *     responses:
 *       200:
 *         description: Post published successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       400:
 *         description: Missing required fields.
 *       401:
 *         description: Unauthorized or missing token.
 *       404:
 *         description: Post not found or not owned by user.
 *       500:
 *         description: Internal server error.
 */
router.post('/publishpost', verifyToken, publishPost)

/**
 * @swagger
 * /users/removepost:
 *   delete:
 *     summary: Remove a post created by the authenticated user
 *     description: Deletes a post authored by the authenticated user. Requires a valid Bearer JWT token.
 *     tags:
 *       - Posts
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *             properties:
 *               id:
 *                 type: integer
 *                 description: The ID of the post to delete.
 *     responses:
 *       200:
 *         description: Post deleted successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       400:
 *         description: Missing required fields.
 *       401:
 *         description: Unauthorized or missing token.
 *       404:
 *         description: Post not found or not owned by user.
 *       500:
 *         description: Internal server error.
 */
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

/**
 * @swagger
 * /users/{id}/posts:
 *   get:
 *     summary: Get posts created by a specific user
 *     description: Returns all published posts authored by the specified user. Requires a valid Bearer JWT token.
 *     tags:
 *       - Posts
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique ID of the user whose posts to retrieve.
 *     responses:
 *       200:
 *         description: Successfully retrieved user's posts.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 posts:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       postedBy:
 *                         type: integer
 *                       title:
 *                         type: string
 *                       content:
 *                         type: string
 *                       status:
 *                         type: string
 *                         enum: [published, draft]
 *       400:
 *         description: Missing required fields.
 *       401:
 *         description: Unauthorized or missing token.
 *       404:
 *         description: User not found.
 *       500:
 *         description: Internal server error.
 */
router.get('/:id/posts', verifyToken, getUserPosts)


export default router;