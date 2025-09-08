import Router from 'express';
import { getMyProfile, getUserProfile, updateProfile, addServices, addClients, removeServices, removeClients, addConnection, removeConnection } from '../controllers/businessController.js';
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
router.get('/myinfo', verifyToken, getMyProfile);

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
router.post('/addclient', verifyToken, addClients);

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
router.delete('/removeclient', verifyToken, removeClients);


/**
 * @swagger
 * /business/addconnection:
 *   post:
 *     summary: Create a connection between two businesses
 *     description: >
 *       Requires a valid Bearer token.  
 *       Creates a connection between the initiating and receiving business IDs. The authenticated user must own one of the businesses.
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
 *               - initiatingBusinessId
 *               - receivingBusinessId
 *             properties:
 *               initiatingBusinessId:
 *                 type: integer
 *                 description: ID of the business initiating the connection
 *               receivingBusinessId:
 *                 type: integer
 *                 description: ID of the business receiving the connection
 *     responses:
 *       201:
 *         description: Connection added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Connection added
 *                 connectionId:
 *                   type: integer
 *                   description: ID of the new connection
 *       400:
 *         description: Missing or invalid business IDs, or cannot connect to self
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Cannot connect to self
 *       401:
 *         description: Authorization header missing or invalid format
 *       403:
 *         description: Invalid or expired token, or user does not own either business
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: You can only create connections for your own business
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
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Internal server error
 */
router.post('/addconnection', verifyToken, addConnection);

/**
 * @swagger
 * /business/removeconnection:
 *   delete:
 *     summary: Remove a business connection
 *     description: >
 *       Requires a valid Bearer token.  
 *       Removes a connection by its ID. The authenticated user must own one of the businesses in the connection.
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
 *               - id
 *             properties:
 *               id:
 *                 type: integer
 *                 description: ID of the connection to remove
 *     responses:
 *       200:
 *         description: Connection removed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Connection removed
 *       400:
 *         description: No connection id provided
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: No connection id provided
 *       401:
 *         description: Authorization header missing or invalid format
 *       403:
 *         description: Invalid or expired token, or user does not own either business in the connection
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: You can only remove connections for your own business
 *       404:
 *         description: No business exists for user or no connection with that id
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: No connection with that id
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
router.delete('/removeconnection', verifyToken, removeConnection);

/**
 * @swagger
 * /business/{id}:
 *   get:
 *     summary: Get business details by ID
 *     description: Returns detailed information about the business owned by a specified user, including basic info, connections, services, and clients.
 *     tags:
 *       - Business
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique ID of the user to retrieve.
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
router.get('/:id', verifyToken, getUserProfile);

export default router;