import Router from 'express';
import { sendMessage, resetSession } from '../controllers/chatBotController.js';
import { verifyToken } from '../middleware/authTolkien.js';

const router = Router();

/**
 * @swagger
 * /chatbot/message:
 *   post:
 *     summary: Send a message to the chatbot
 *     description: Sends a user message to the TIA chatbot and returns the response. Requires authentication.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 description: The user's message to send to the chatbot.
 *                 example: "Hello, I want to connect with partners."
 *               chatType:
 *                 type: string
 *                 description: The type of chat ("vision", "connect", "ladder" or "default"). "default" or leaving the field empty grants access to all the chat types, mainly for testing and development.
 *                 example: "default"
 *               connection_type:
 *                 type: string
 *                 description: The type of connection.
 *                 example: "complementary"
 *               region:
 *                 type: string
 *                 description: The user's region.
 *                 example: "au"
 *               lat:
 *                 type: number
 *                 description: Latitude of the user's location.
 *                 example: -27.4705
 *               lng:
 *                 type: number
 *                 description: Longitude of the user's location.
 *                 example: 153.026
 *             required:
 *               - message
 *     responses:
 *       200:
 *         description: Successful response from the chatbot.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 response:
 *                   type: string
 *                   description: The chatbot's response message.
 *                   example: "Hello! How can I help you today?"
 *                 session_id:
 *                   type: string
 *                   description: The session ID for the conversation.
 *                   example: "123e4567-e89b-12d3-a456-426614174000"
 *                 state:
 *                   type: object
 *                   description: The current state of the session.
 *                 author:
 *                   type: string
 *                   description: The author of the response (e.g., "CoordinatorAgent").
 *                   example: "CoordinatorAgent"
 *       400:
 *         description: Bad request, missing required fields.
 *       401:
 *         description: Unauthorized, invalid or missing token.
 *       500:
 *         description: Internal server error.
 */
router.post('/message', verifyToken, sendMessage);

/**
 * @swagger
 * /chatbot/reset:
 *   post:
 *     summary: Reset the chatbot session
 *     description: Resets the user's chatbot session. Requires authentication.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Session reset successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: "Your session has been reset. You can start a new conversation."
 *       401:
 *         description: Unauthorized, invalid or missing token.
 *       500:
 *         description: Internal server error.
 */
router.post('/reset', verifyToken, resetSession);

export default router;