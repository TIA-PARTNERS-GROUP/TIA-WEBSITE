import Router from 'express';
import { checkUserExists } from '../controllers/userController.js';

const router = Router();

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

export default router;