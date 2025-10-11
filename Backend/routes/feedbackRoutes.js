import Router from 'express';
import { submitFeedback } from '../controllers/feedbackController.js'
import { verifyToken } from '../middleware/authTolkien.js';
const router = Router();


/**
 * @swagger
 * /feedback:
 *   post:
 *     summary: Submit feedback
 *     tags: [Feedback]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - content
 *             properties:
 *               content:
 *                 type: string
 *                 description: The user's feedback message.
 *                 example: "This is a great feature!"
 *     responses:
 *       201:
 *         description: Feedback submitted successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Success
 *       400:
 *         description: Bad Request - Missing required fields.
 *       401:
 *         description: Unauthorized - Token is missing or invalid.
 *       500:
 *         description: Internal Server Error.
 */

router.post('/', verifyToken, submitFeedback)

export default router;