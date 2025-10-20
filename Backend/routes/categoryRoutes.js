import Router from 'express';
import { 
  getBusinessCategories, 
  getBusinessSkills, 
  getStrengthCategories, 
  getStrengths, 
  getSkillCategories,
  getSkills 
} from '../controllers/categoryController.js';

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
router.get('/getcategories', getBusinessCategories);

/**
 * @swagger
 * /getbusinessskills:
 *   get:
 *     summary: Get all business skills (services)
 *     description: Returns a list of all available business skills/services with their IDs and names. These represent services that businesses offer.
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
 *                         description: Business skill ID
 *                         example: 1
 *                       name:
 *                         type: string
 *                         description: Business skill/service name
 *                         example: "App Development"
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
router.get('/getbusinessskills', getBusinessSkills);

/**
 * @swagger
 * /getskillcategories:
 *   get:
 *     summary: Get all skill categories
 *     description: Returns a list of all available skill categories with their IDs and names. Accessible without authentication.
 *     tags:
 *       - Categories/Skills
 *     responses:
 *       200:
 *         description: Successfully retrieved skill categories
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
 *                         example: "Technical Skills"
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
router.get('/getskillcategories', getSkillCategories);

/**
 * @swagger
 * /getskills:
 *   get:
 *     summary: Get all technical/personal skills with categories
 *     description: Returns a list of all available technical and personal skills with their IDs, names, and category information. These represent individual capabilities.
 *     tags:
 *       - Categories/Skills
 *     responses:
 *       200:
 *         description: Successfully retrieved skills
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
 *                         example: "JavaScript"
 *                       category_id:
 *                         type: integer
 *                         description: Category ID
 *                         example: 1
 *                       category_name:
 *                         type: string
 *                         description: Category name
 *                         example: "Programming Languages"
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
router.get('/getskills', getSkills);

/**
 * @swagger
 * /getstrengthcategories:
 *   get:
 *     summary: Get all strength categories
 *     description: Returns a list of all available strength categories with their IDs and names. Accessible without authentication.
 *     tags:
 *       - Categories/Skills
 *     responses:
 *       200:
 *         description: Successfully retrieved strength categories
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
 *                         example: "Financial Strengths"
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
router.get('/getstrengthcategories', getStrengthCategories);

/**
 * @swagger
 * /getstrengths:
 *   get:
 *     summary: Get all strengths with categories
 *     description: Returns a list of all available business strengths with their IDs, names, and category information. These represent business advantages and capabilities.
 *     tags:
 *       - Categories/Skills
 *     responses:
 *       200:
 *         description: Successfully retrieved strengths
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Success
 *                 strengths:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         description: Strength ID
 *                         example: 1
 *                       name:
 *                         type: string
 *                         description: Strength name
 *                         example: "High Profit Margins"
 *                       category_id:
 *                         type: integer
 *                         description: Category ID
 *                         example: 1
 *                       category_name:
 *                         type: string
 *                         description: Category name
 *                         example: "Financial Strengths"
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
router.get('/getstrengths', getStrengths);

export default router;