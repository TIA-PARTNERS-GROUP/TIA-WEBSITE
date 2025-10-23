import Router from 'express';
import { sendMessage, resetSession } from '../controllers/chatBotController.js';
import { verifyToken } from '../middleware/authTolkien.js';
import { validator } from '../middleware/validators/joiConfig.js';
import { chatMessageSchema, resetSchema } from '../middleware/validators/chatBotValidator.js';

const router = Router();

/**
 * @swagger
 * /chatbot/message:
 *   post:
 *     summary: Send a message to the chatbot
 *     description: Sends a user message to the Google ADK server and returns the response. Requires authentication.
 *     tags:
 *       - Chatbot
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
 *               chat_type:
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
 *                   example: "Hello! How can I assist you today? Would you like to explore potential partnership opportunities, or do you have something else in mind?"
 *                 session_id:
 *                   type: string
 *                   description: The session ID for the conversation.
 *                   example: "bf36f521-b33a-4478-930a-225a9d74bc16"
 *                 state:
 *                   type: object
 *                   description: The current state of the session, including user details and agent data.
 *                   properties:
 *                     name:
 *                       type: string
 *                       description: The user's name.
 *                       example: "joshua"
 *                     user_id:
 *                       type: string
 *                       description: The user's ID.
 *                       example: "6"
 *                     connection_type:
 *                       type: string
 *                       description: The type of connection.
 *                       example: "complementary"
 *                     region:
 *                       type: string
 *                       description: The user's region.
 *                       example: "au"
 *                     lat:
 *                       type: number
 *                       description: Latitude of the user's location.
 *                       example: -27.4705
 *                     lng:
 *                       type: number
 *                       description: Longitude of the user's location.
 *                       example: 153.026
 *                     user_profile:
 *                       type: string
 *                       description: The status of the user profile.
 *                       example: "generated"
 *                     set_agent:
 *                       type: string
 *                       description: The current agent set for the session.
 *                       example: "CoordinatorAgent"
 *                     Generated_Profile:
 *                       type: object
 *                       description: The generated user profile details.
 *                       properties:
 *                         UserName:
 *                           type: string
 *                           example: "joshua Wlodarczyk"
 *                         Business_Name:
 *                           type: string
 *                           example: "TIA TEST"
 *                         Contact_Email:
 *                           type: string
 *                           example: "joshuawlod2003@gmail.com"
 *                         Contact_Phone_No:
 *                           type: string
 *                           example: "0423158014"
 *                         Business_Type:
 *                           type: string
 *                           example: "AI-powered customer service automation"
 *                         UserJob:
 *                           type: string
 *                           example: "Founder and CEO"
 *                         User_Strength:
 *                           type: string
 *                           example: "Empowering small businesses to thrive"
 *                         User_skills:
 *                           type: string
 *                           example: "Leadership, Strategic planning, AI implementation, AI solutions, Customer service automation, Problem-solving"
 *                         Business_Strength:
 *                           type: string
 *                           example: "Enhancing efficiency and reducing stress for clients"
 *                         Business_Skills:
 *                           type: string
 *                           example: "Leadership, Strategic planning, AI implementation, AI solutions, Customer service automation, Problem-solving"
 *                         Business_Category:
 *                           type: string
 *                           example: "Technology and services"
 *                     ConnectAgent:
 *                       type: object
 *                       description: Data from the ConnectAgent, including connection results.
 *                       properties:
 *                         connection_result:
 *                           type: object
 *                           description: The result of the connection process.
 *                           example: {}  # Placeholder; actual object would be detailed based on data
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
router.post('/message', verifyToken, validator(chatMessageSchema), sendMessage);
/**
 * @swagger
 * /chatbot/reset:
 *   post:
 *     summary: Reset the chatbot session
 *     description: Resets the user's chatbot session. Requires authentication.
 *     tags:
 *       - Chatbot
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
router.post('/reset', verifyToken, validator(resetSchema), resetSession);

export default router;