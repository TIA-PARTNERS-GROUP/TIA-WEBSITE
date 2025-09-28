import Router from 'express';
import { 
  getMyNotifications, 
  getPendingConnections,
  addNotification, 
  removeNotification 
} from '../controllers/notificationController.js';
import { verifyToken } from '../middleware/authTolkien.js';

const router = Router();

/**
 * @swagger
 * /notifications/mynotifications:
 *   get:
 *     summary: Get current user's pending notifications
 *     description: Returns all unopened notifications for the authenticated user
 *     tags:
 *       - Notifications
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved notifications
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Success
 *                 notifications:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         description: Notification ID
 *                       sender_user_id:
 *                         type: integer
 *                         description: ID of the user who sent the notification
 *                       receiver_user_id:
 *                         type: integer
 *                         description: ID of the user who received the notification
 *                       message:
 *                         type: string
 *                         description: Notification message content
 *                       time_sent:
 *                         type: string
 *                         format: date-time
 *                         description: When the notification was sent
 *                       opened:
 *                         type: integer
 *                         description: Whether the notification has been opened (0 = unopened)
 *                       sender_business_name:
 *                         type: string
 *                         description: Name of the sender's business
 *       401:
 *         description: Authorization header missing or invalid
 *       403:
 *         description: Invalid or expired token
 *       500:
 *         description: Internal server error
 */
router.get('/mynotifications', verifyToken, getMyNotifications);

/**
 * @swagger
 * /notifications/pendingconnections:
 *   get:
 *     summary: Get pending connection requests sent by current user
 *     description: Returns a list of pending connection requests where the current user's business is the sender and message contains "connect"
 *     tags:
 *       - Notifications
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved pending connections
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Success
 *                 pendingConnections:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       notification_id:
 *                         type: integer
 *                         description: ID of the notification
 *                       receiving_user_id:
 *                         type: integer
 *                         description: ID of the user receiving the notification
 *                       receiver_business_id:
 *                         type: integer
 *                         description: ID of the receiver's business 
 *       401:
 *         description: Authorization header missing or invalid
 *       403:
 *         description: Invalid or expired token
 *       404:
 *         description: No business found for user
 *       500:
 *         description: Internal server error
 */
router.get('/pendingconnections', verifyToken, getPendingConnections);

/**
 * @swagger
 * /notifications/addnotification:
 *   post:
 *     summary: Add a new notification
 *     description: Creates a new notification for connection requests
 *     tags:
 *       - Notifications
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - receiver_user_id
 *               - message
 *             properties:
 *               receiver_user_id:
 *                 type: integer
 *                 description: ID of the user who will receive the notification
 *               message:
 *                 type: string
 *                 description: The notification message content
 *     responses:
 *       201:
 *         description: Notification successfully created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Notification added
 *                 notificationId:
 *                   type: integer
 *                   description: ID of the newly created notification
 *       400:
 *         description: Missing required fields
 *       401:
 *         description: Authorization header missing or invalid
 *       403:
 *         description: Invalid or expired token
 *       404:
 *         description: Receiver user not found
 *       500:
 *         description: Internal server error
 */
router.post('/addnotification', verifyToken, addNotification);

/**
 * @swagger
 * /notifications/removenotification:
 *   delete:
 *     summary: Remove a notification
 *     description: Deletes a notification (only allowed for sender or receiver)
 *     tags:
 *       - Notifications
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
 *                 description: ID of the notification to remove
 *     responses:
 *       200:
 *         description: Notification successfully removed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Notification removed
 *       400:
 *         description: Missing notification ID
 *       401:
 *         description: Authorization header missing or invalid
 *       403:
 *         description: Not authorized to remove this notification
 *       404:
 *         description: Notification not found
 *       500:
 *         description: Internal server error
 */
router.delete('/removenotification', verifyToken, removeNotification);

export default router;