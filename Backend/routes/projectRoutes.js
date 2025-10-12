import Router from 'express';
import { addApplicant, removeApplicant, addProject, getProject, updateProject, deleteProject, getMyProjects, getAppliedProjects, getProjects } from '../controllers/projectController.js';
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
 * /projects:
 *   post:
 *     summary: Create a new project
 *     tags:
 *       - Projects
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - description
 *             properties:
 *               name:
 *                 type: string
 *                 example: Community Outreach
 *               description:
 *                 type: string
 *                 example: A short project description
 *               status:
 *                 type: string
 *                 enum: [open, closed]
 *                 example: open
 *               openDate:
 *                 type: string
 *                 format: date-time
 *                 nullable: true
 *               closeDate:
 *                 type: string
 *                 format: date-time
 *                 nullable: true
 *               completionDate:
 *                 type: string
 *                 format: date-time
 *                 nullable: true
 *               categoryIds:
 *                 type: array
 *                 items:
 *                   type: integer
 *               skillIds:
 *                 type: array
 *                 items:
 *                   type: integer
 *               regions:
 *                 type: array
 *                 items:
 *                   type: string
 *                   example: nsw
 *     responses:
 *       201:
 *         description: Project created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 projectId:
 *                   type: integer
 *       400:
 *         description: Bad request (validation error)
 *       401:
 *         description: Unauthorized or missing token
 *       500:
 *         description: Internal server error
 */
router.post('/', verifyToken, addProject);

/**
 * @swagger
 * /projects:
 *   get:
 *     summary: Get a paginated list of projects
 *     tags:
 *       - Projects
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number (default 1)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Items per page (default 20)
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search text
 *       - in: query
 *         name: categories
 *         schema:
 *           type: string
 *         description: Comma-separated category ids
 *       - in: query
 *         name: skills
 *         schema:
 *           type: string
 *         description: Comma-separated skill ids
 *       - in: query
 *         name: regions
 *         schema:
 *           type: string
 *         description: Comma-separated region codes (e.g., nsw,vic)
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [open, closed]
 *         description: Filter by project status
 *     responses:
 *       200:
 *         description: List of projects with pagination
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                 pagination:
 *                   type: object
 *     500:
 *       description: Internal server error
 */
router.get('/', getProjects);

/**
 * @swagger
 * /projects/{id}/applicants:
 *   post:
 *     summary: Add the authenticated user as an applicant to a project
 *     tags:
 *       - Projects
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Project ID
 *     responses:
 *       201:
 *         description: Applicant added
 *       404:
 *         description: Project not found
 *       409:
 *         description: Applicant already added
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.post('/:id/applicants', verifyToken, addApplicant);

/**
 * @swagger
 * /projects/{id}/applicants/{userId}:
 *   delete:
 *     summary: Remove an applicant from a project (manager only)
 *     tags:
 *       - Projects
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Project ID
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *         description: User ID of the applicant to remove
 *     responses:
 *       200:
 *         description: Applicant removed
 *       403:
 *         description: Forbidden - not project manager
 *       404:
 *         description: Project or applicant not found
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.delete('/:id/applicants/:userId', verifyToken, removeApplicant);

/**
 * @swagger
 * /projects/{id}:
 *   patch:
 *     summary: Update a project (manager only)
 *     tags:
 *       - Projects
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Project ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             description: Fields to update (any project fields allowed)
 *     responses:
 *       201:
 *         description: Project updated
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - not project manager
 *       404:
 *         description: Project not found
 *       500:
 *         description: Internal server error
 */
router.patch('/:id', verifyToken, updateProject);

/**
 * @swagger
 * /projects/my:
 *   get:
 *     summary: Get projects managed by the authenticated user
 *     tags:
 *       - Projects
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of projects managed by the user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 projects:
 *                   type: array
 *                   items:
 *                     type: object
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.get('/my', verifyToken, getMyProjects);

/**
 * @swagger
 * /projects/applied:
 *   get:
 *     summary: Get projects the authenticated user has applied to
 *     tags:
 *       - Projects
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of applied projects
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 projects:
 *                   type: array
 *                   items:
 *                     type: object
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.get('/applied', verifyToken, getAppliedProjects);

/**
 * @swagger
 * /projects/{id}:
 *   get:
 *     summary: Get project details by ID
 *     tags:
 *       - Projects
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Project ID
 *     responses:
 *       200:
 *         description: Project details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 project:
 *                   type: object
 *       404:
 *         description: Project not found
 *       500:
 *         description: Internal server error
 */
router.get('/:id', getProject);

/**
 * @swagger
 * /projects/{id}:
 *   delete:
 *     summary: Delete a project (manager only)
 *     tags:
 *       - Projects
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Project ID
 *     responses:
 *       200:
 *         description: Project deleted
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - not project manager
 *       404:
 *         description: Project not found
 *       500:
 *         description: Internal server error
 */
router.delete('/:id', verifyToken, deleteProject);


export default router;