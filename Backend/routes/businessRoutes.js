import Router from 'express';
import { getProfile, updateProfile, addServices, addClients, removeServices, removeClients } from '../controllers/businessController.js';
import { verifyToken, verifyRefreshToken } from '../middleware/authTolkien.js';

const router = Router();
/**
 * @swagger
 * /business/myinfo:
 *   get:
 *     summary: Retrieve the authenticated user's business profile
 *     description: Returns detailed information about the business owned by the authenticated user, including basic info, connections, services, and clients.
 *     tags:
 *       - Business
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved business information
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Success
 *                 businessName:
 *                   type: string
 *                   description: Name of the business
 *                 contactName:
 *                   type: string
 *                   description: Contact person's name
 *                 contactPhone:
 *                   type: string
 *                   description: Contact phone number
 *                 contactEmail:
 *                   type: string
 *                   description: Contact email address
 *                 businessCategory:
 *                   type: string
 *                   description: Name of the business category
 *                 businessDescription:
 *                   type: string
 *                   description: Business description
 *                 connections:
 *                   type: array
 *                   description: Array of connected businesses
 *                   items:
 *                     type: object
 *                 services:
 *                   type: array
 *                   description: Array of services offered by the business
 *                   items:
 *                     type: object
 *                 clients:
 *                   type: array
 *                   description: Array of clients of the business
 *                   items:
 *                     type: object
 *       401:
 *         description: Authorization header missing or invalid
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Authorization header missing
 *       403:
 *         description: Invalid or expired token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Invalid or expired token
 *       404:
 *         description: No business found for the authenticated user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: No business exists for user
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
router.get('/myinfo', verifyToken, getProfile);

/**
 * @swagger
 * /business/update:
 *   patch:
 *     summary: Update business profile of the authenticated user
 *     description: Updates the fields of the business associated with the authenticated user. Only the provided fields in the request body will be updated.
 *     tags:
 *       - Business
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Fields to update for the business. Only include the fields you want to update.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the business
 *               tagline:
 *                 type: string
 *                 description: Business tagline
 *               website:
 *                 type: string
 *                 description: Business website URL
 *               contactName:
 *                 type: string
 *                 description: Contact person's name
 *               contactPhoneNo:
 *                 type: string
 *                 description: Contact phone number
 *               contactEmail:
 *                 type: string
 *                 description: Contact email address
 *               description:
 *                 type: string
 *                 description: Business description
 *               address:
 *                 type: string
 *                 description: Business address
 *               city:
 *                 type: string
 *                 description: City of the business
 *               businessType:
 *                 type: integer
 *                 description: Business type ID
 *               businessCategory:
 *                 type: integer
 *                 description: Business category ID
 *               businessPhase:
 *                 type: string
 *                 description: Current phase of the business
 *     responses:
 *       201:
 *         description: Business successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Business updated
 *       400:
 *         description: Bad request, invalid fields in body
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Bad request
 *       401:
 *         description: Authorization header missing or invalid
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Authorization header missing
 *       403:
 *         description: Invalid or expired token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Invalid or expired token
 *       404:
 *         description: No business found for the authenticated user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: No business exists for user
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
router.patch('/update', verifyToken, updateProfile)

/**
 * @swagger
 * /business/addservice:
 *   post:
 *     summary: Add one or more services to the authenticated user's business
 *     description: >
 *       Requires a valid Bearer token.  
 *       Adds one or more services (by name/description) to the business associated with the authenticated user.  
 *       Returns the IDs of the newly created services.
 *     tags:
 *       - Business
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - services
 *             properties:
 *               services:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["Web Design", "SEO Optimization", "Consulting"]
 *     responses:
 *       201:
 *         description: Services added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Success
 *                 newServices:
 *                   type: object
 *                   additionalProperties:
 *                     type: integer
 *                   example:
 *                     "Web Design": 12
 *                     "SEO Optimization": 13
 *       400:
 *         description: No services provided
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: No services provided
 *       401:
 *         description: Authorization header missing or invalid format
 *       403:
 *         description: Invalid or expired token
 *       404:
 *         description: No business exists for user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: No business exists for user
 *       500:
 *         description: Internal server error
 */
router.post('/addservice', verifyToken, addServices)

/**
 * @swagger
 * /business/addclient:
 *   post:
 *     summary: Add one or more clients to the authenticated user's business
 *     description: >
 *       Requires a valid Bearer token.  
 *       Adds one or more clients (by name/description) to the business associated with the authenticated user.  
 *       Returns the IDs of the newly created clients.
 *     tags:
 *       - Business
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - clients
 *             properties:
 *               clients:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["Acme Corp", "Beta Ltd", "Charlie Industries"]
 *     responses:
 *       201:
 *         description: Clients added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Success
 *                 newClients:
 *                   type: object
 *                   additionalProperties:
 *                     type: integer
 *                   example:
 *                     "Acme Corp": 21
 *                     "Beta Ltd": 22
 *       400:
 *         description: No clients provided
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: No clients provided
 *       401:
 *         description: Authorization header missing or invalid format
 *       403:
 *         description: Invalid or expired token
 *       404:
 *         description: No business exists for user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: No business exists for user
 *       500:
 *         description: Internal server error
 */
router.post('/addclient', verifyToken, addClients)

/**
 * @swagger
 * /business/removeservice:
 *   delete:
 *     summary: Remove one or more services from the authenticated user's business
 *     description: >
 *       Requires a valid Bearer token.  
 *       Removes one or more services (by ID) from the business associated with the authenticated user.  
 *       Each provided service ID will return a success or failure outcome.
 *     tags:
 *       - Business
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - services
 *             properties:
 *               services:
 *                 type: array
 *                 items:
 *                   type: integer
 *                 example: [12, 13, 14]
 *     responses:
 *       201:
 *         description: Service removal attempted, results returned
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Success
 *                 outcomes:
 *                   type: object
 *                   additionalProperties:
 *                     type: string
 *                   example:
 *                     "12": "Success"
 *                     "13": "No service with that id for this business"
 *       400:
 *         description: No services provided
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: No services provided
 *       401:
 *         description: Authorization header missing or invalid format
 *       403:
 *         description: Invalid or expired token
 *       404:
 *         description: No business exists for user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: No business exists for user
 *       500:
 *         description: Internal server error
 */
router.delete('/removeservice', verifyToken, removeServices)

/**
 * @swagger
 * /business/removeclient:
 *   delete:
 *     summary: Remove one or more clients from the authenticated user's business
 *     description: >
 *       Requires a valid Bearer token.  
 *       Removes one or more clients (by ID) from the business associated with the authenticated user.  
 *       Each provided client ID will return a success or failure outcome.
 *     tags:
 *       - Business
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - clients
 *             properties:
 *               clients:
 *                 type: array
 *                 items:
 *                   type: integer
 *                 example: [21, 22, 23]
 *     responses:
 *       201:
 *         description: Client removal attempted, results returned
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Success
 *                 outcomes:
 *                   type: object
 *                   additionalProperties:
 *                     type: string
 *                   example:
 *                     "21": "Success"
 *                     "22": "No client with that id for this business"
 *       400:
 *         description: No clients provided
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: No clients provided
 *       401:
 *         description: Authorization header missing or invalid format
 *       403:
 *         description: Invalid or expired token
 *       404:
 *         description: No business exists for user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: No business exists for user
 *       500:
 *         description: Internal server error
 */
router.delete('/removeclient', verifyToken, removeClients)

export default router;