import Router from 'express';
import {
  getComplementaryPartners,
  getAlliancePartners,
  getMastermindPartners
} from '../controllers/gnnController.js';
import { verifyToken } from '../middleware/authTolkien.js';
import { validator } from '../middleware/validators/joiConfig.js';
import { userIdParams, projectIdParams } from '../middleware/validators/gnnValidator.js';

const router = Router();

/**
 * @swagger
 * /gnn/user/{user_id}/complementary-partners:
 *   get:
 *     summary: Get complementary business partners
 *     description: Identifies businesses in the same Business Type but different Business Categories, ideal for mutual client referrals and cross-promotion opportunities.
 *     tags:
 *       - GNN Recommendations
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: user_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the user to get recommendations for
 *     responses:
 *       200:
 *         description: Successfully retrieved complementary partner recommendations
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   recommendation:
 *                     type: object
 *                     properties:
 *                       business:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                           name:
 *                             type: string
 *                       operator:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                           name:
 *                             type: string
 *                   reason:
 *                     type: string
 *                     description: Explanation of how the businesses complement each other
 *       400:
 *         description: Invalid user ID
 *       401:
 *         description: Authorization header missing or invalid
 *       403:
 *         description: Invalid or expired token
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error or GNN service unavailable
 */
router.get('/user/:user_id/complementary-partners', verifyToken, validator(userIdParams, 'params'), getComplementaryPartners);router.get('/user/:user_id/complementary-partners', verifyToken, validator(userIdParams, 'params'), getComplementaryPartners);

/**
 * @swagger
 * /gnn/project/{project_id}/alliance-partners:
 *   get:
 *     summary: Get alliance partners for a specific project
 *     description: Identifies users who possess the specific Business Skills required by a project, making them ideal for collaboration and project-based partnerships.
 *     tags:
 *       - GNN Recommendations
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: project_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the project to find partners for
 *     responses:
 *       200:
 *         description: Successfully retrieved alliance partner recommendations
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   recommendation:
 *                     type: object
 *                     properties:
 *                       user:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                           name:
 *                             type: string
 *                       business:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                           name:
 *                             type: string
 *                   reason:
 *                     type: string
 *                     description: Explanation of why they are suitable alliance partners
 *       400:
 *         description: Invalid project ID
 *       401:
 *         description: Authorization header missing or invalid
 *       403:
 *         description: Invalid or expired token
 *       404:
 *         description: Project not found
 *       500:
 *         description: Internal server error or GNN service unavailable
 */
router.get('/project/:project_id/alliance-partners', verifyToken, validator(projectIdParams, 'params'), getAlliancePartners);

/**
 * @swagger
 * /gnn/user/{user_id}/mastermind-partners:
 *   get:
 *     summary: Get mastermind partners with complementary strengths
 *     description: Suggests partners who have strengths in categories different from the user's own, ideal for supportive accountability, knowledge sharing, and overcoming business obstacles.
 *     tags:
 *       - GNN Recommendations
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: user_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the user to get recommendations for
 *     responses:
 *       200:
 *         description: Successfully retrieved mastermind partner recommendations
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   recommendation:
 *                     type: object
 *                     properties:
 *                       user:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                           name:
 *                             type: string
 *                   reason:
 *                     type: string
 *                     description: Explanation of complementary strengths and benefits
 *       400:
 *         description: Invalid user ID
 *       401:
 *         description: Authorization header missing or invalid
 *       403:
 *         description: Invalid or expired token
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error or GNN service unavailable
 */
router.get('/user/:user_id/mastermind-partners', verifyToken, validator(userIdParams, 'params'), getMastermindPartners);


export default router;