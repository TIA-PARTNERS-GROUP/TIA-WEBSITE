import Router from 'express';
import { getBusinessCategories, getBusinessSkills } from '../controllers/categoryController.js';

const router = Router();

/**
 * @swagger
 * /getcategories:
 *   get:
 *     summary: Get all business categories
 *     description: Returns a list of all available business categories with their IDs and names. Accessible without authentication.
 *     tags:
 *       - Categories/Skills
 *     responses:
 *       200:
 *         description: Successfully retrieved business categories
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Success
 *                 categories:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         description: Category ID
 *                         example: 1
 *                       name:
 *                         type: string
 *                         description: Category name
 *                         example: "Technology"
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
router.get('/getcategories', getBusinessCategories); // Removed verifyToken

/**
 * @swagger
 * /getskills:
 *   get:
 *     summary: Get all business skills
 *     description: Returns a list of all available business skills with their IDs and names. Accessible without authentication.
 *     tags:
 *       - Categories/Skills
 *     responses:
 *       200:
 *         description: Successfully retrieved business skills
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Success
 *                 skills:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         description: Skill ID
 *                         example: 1
 *                       name:
 *                         type: string
 *                         description: Skill name
 *                         example: "Project Management"
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
router.get('/getskills', getBusinessSkills);

export default router;