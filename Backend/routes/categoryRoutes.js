import Router from 'express';
import { getBusinessCategories } from '../controllers/categoryController.js';

const router = Router();

/**
 * @swagger
 * /business/getcategories:
 *   get:
 *     summary: Get all business categories
 *     description: Returns a list of all available business categories with their IDs and names. Accessible without authentication.
 *     tags:
 *       - Business Categories
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

export default router;