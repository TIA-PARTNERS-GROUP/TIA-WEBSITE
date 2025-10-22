import Router from 'express';
import { getMyProfile, getUserProfile, updateProfile, addServices, addClients, removeServices, removeClients, addConnection, removeConnection, queryBusinesses, addL2EResponse, getLatestL2EResponse, getAllL2EResponses, addSkills, removeSkills, addStrengths, removeStrengths } from '../controllers/businessController.js';
import { emptyQuery } from '../middleware/validators/generalValidator.js';
import { getMyProfile, getUserProfile, updateProfile, addServices, addClients, removeServices, removeClients, addConnection, removeConnection, queryBusinesses, addL2EResponse, getLatestL2EResponse, getAllL2EResponses } from '../controllers/businessController.js';
import { verifyToken, verifyRefreshToken } from '../middleware/authTolkien.js';
// Integration of validation middleware with this module's Joi Schema
import { validator } from '../middleware/validators/joiConfig.js';
import {
  querySchema,
  updateSchema,
  serviceOpSchema,
  clientsOpSchema,
  addConnectionSchema,
  removeConnectionSchema,
  l2eBodySchema,
  byIdParamsSchema
} from '../middleware/validators/businessValidator.js';


const router = Router();
/**
 * @swagger
 * /business/query:
 *   get:
 *     summary: Get paginated list of businesses with filtering
 *     description: Returns a paginated list of businesses with optional search and tag filtering. Supports pagination parameters.
 *     tags:
 *       - Business
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *           default: 10
 *         description: Number of items per page
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search query to filter businesses by name, description, or tagline
 *       - in: query
 *         name: tags
 *         schema:
 *           type: array
 *           items:
 *             type: integer
 *         description: Array of business category IDs to filter by (can be specified multiple times)
 *         style: form
 *         explode: true
 *     responses:
 *       200:
 *         description: Successfully retrieved paginated businesses
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Success
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         description: Business ID
 *                       name:
 *                         type: string
 *                         description: Business name
 *                       tagline:
 *                         type: string
 *                         description: Business tagline
 *                       contact_name:
 *                         type: string
 *                         description: Contact person's name
 *                       contact_email:
 *                         type: string
 *                         description: Contact email address
 *                       category_name:
 *                         type: string
 *                         description: Business category name
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     currentPage:
 *                       type: integer
 *                       example: 1
 *                     totalPages:
 *                       type: integer
 *                       example: 5
 *                     totalItems:
 *                       type: integer
 *                       example: 42
 *                     itemsPerPage:
 *                       type: integer
 *                       example: 10
 *                     hasNext:
 *                       type: boolean
 *                       example: true
 *                     hasPrev:
 *                       type: boolean
 *                       example: false
 *       400:
 *         description: Invalid query parameters
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Page must be at least 1
 *       401:
 *         description: Authorization header missing or invalid
 *       403:
 *         description: Invalid or expired token
 *       500:
 *         description: Internal server error
 */
router.get('/query', verifyToken, validator(querySchema, 'query'), queryBusinesses);
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
router.get('/myinfo', verifyToken, validator(emptyQuery,'query'), getMyProfile);

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
router.patch('/update', verifyToken, validator(updateSchema), updateProfile)

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
router.post('/addservice', verifyToken, validator(serviceOpSchema), addServices)

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
router.post('/addclient', verifyToken, validator(clientsOpSchema), addClients);

/**
 * @swagger
 * /business/addskill:
 *   post:
 *     summary: Add one or more skills to the authenticated user's business
 *     description: >
 *       Requires a valid Bearer token.  
 *       Adds one or more skills (by ID) to the business associated with the authenticated user.  
 *       Returns the IDs of the newly created skill associations.
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
 *               - skills
 *             properties:
 *               skills:
 *                 type: array
 *                 items:
 *                   type: integer
 *                 example: [1, 2, 3]
 *     responses:
 *       201:
 *         description: Skills added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Success
 *                 newSkills:
 *                   type: object
 *                   additionalProperties:
 *                     type: integer
 *       400:
 *         description: No skills provided
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: No skills provided
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
router.post('/addskill', verifyToken, addSkills);

/**
 * @swagger
 * /business/addstrength:
 *   post:
 *     summary: Add one or more strengths to the authenticated user's business
 *     description: >
 *       Requires a valid Bearer token.  
 *       Adds one or more strengths (by ID) to the business associated with the authenticated user.  
 *       Returns the IDs of the newly created strength associations.
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
 *               - strengths
 *             properties:
 *               strengths:
 *                 type: array
 *                 items:
 *                   type: integer
 *                 example: [1, 2, 3]
 *     responses:
 *       201:
 *         description: Strengths added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Success
 *                 newStrengths:
 *                   type: object
 *                   additionalProperties:
 *                     type: integer
 *       400:
 *         description: No strengths provided
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: No strengths provided
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
router.post('/addstrength', verifyToken, addStrengths);

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
router.delete('/removeservice', verifyToken, validator(serviceOpSchema), removeServices)

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
router.delete('/removeclient', verifyToken, validator(clientsOpSchema), removeClients);

/**
 * @swagger
 * /business/removeskill:
 *   delete:
 *     summary: Remove one or more skills from the authenticated user's business
 *     description: >
 *       Requires a valid Bearer token.  
 *       Removes one or more skills (by ID) from the business associated with the authenticated user.  
 *       Each provided skill ID will return a success or failure outcome.
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
 *               - skills
 *             properties:
 *               skills:
 *                 type: array
 *                 items:
 *                   type: integer
 *                 example: [1, 2, 3]
 *     responses:
 *       201:
 *         description: Skill removal attempted, results returned
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
 *                     "1": "Success"
 *                     "2": "No skill with that id for this business"
 *       400:
 *         description: No skills provided
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: No skills provided
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
router.delete('/removeskill', verifyToken, removeSkills);

/**
 * @swagger
 * /business/removestrength:
 *   delete:
 *     summary: Remove one or more strengths from the authenticated user's business
 *     description: >
 *       Requires a valid Bearer token.  
 *       Removes one or more strengths (by ID) from the business associated with the authenticated user.  
 *       Each provided strength ID will return a success or failure outcome.
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
 *               - strengths
 *             properties:
 *               strengths:
 *                 type: array
 *                 items:
 *                   type: integer
 *                 example: [1, 2, 3]
 *     responses:
 *       201:
 *         description: Strength removal attempted, results returned
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
 *                     "1": "Success"
 *                     "2": "No strength with that id for this business"
 *       400:
 *         description: No strengths provided
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: No strengths provided
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
router.delete('/removestrength', verifyToken, removeStrengths);

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
router.post('/addconnection', verifyToken, validator(addConnectionSchema), addConnection);

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
router.delete('/removeconnection', verifyToken, validator(removeConnectionSchema), removeConnection);

/**
 * @swagger
 * /business/l2e:
 *   post:
 *     summary: Record a new L2E response for the authenticated user
 *     description: Stores an arbitrary JSON response associated with the authenticated user.
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
 *             description: Arbitrary JSON response object to store
 *     responses:
 *       201:
 *         description: L2E response recorded
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: L2E response recorded
 *                 id:
 *                   type: integer
 *                   description: Inserted response id
 *       400:
 *         description: No response provided
 *       401:
 *         description: Authorization header missing or invalid
 *       500:
 *         description: Internal server error
 */
router.post('/l2e', verifyToken, validator(l2eBodySchema), addL2EResponse);


/**
 * @swagger
 * /business/l2e/latest:
 *   get:
 *     summary: Get the most recent L2E response for the authenticated user
 *     tags:
 *       - Business
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Latest response for the user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Success
 *                 response:
 *                   type: object
 *                   description: The stored JSON response
 *                 date_added:
 *                   type: string
 *                   format: date-time
 *       401:
 *         description: Authorization header missing or invalid
 *       404:
 *         description: No responses found for the user
 *       500:
 *         description: Internal server error
 */
router.get('/l2e/latest', verifyToken, validator(emptyQuery,'query'), getLatestL2EResponse);


/**
 * @swagger
 * /business/l2e:
 *   get:
 *     summary: Get all L2E responses for the authenticated user
 *     tags:
 *       - Business
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: All responses for the user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Success
 *                 responses:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       response:
 *                         type: object
 *                       date_added:
 *                         type: string
 *                         format: date-time
 *       401:
 *         description: Authorization header missing or invalid
 *       500:
 *         description: Internal server error
 */
router.get('/l2e', verifyToken, validator(emptyQuery,'query'), getAllL2EResponses);


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
router.get('/:id', verifyToken, validator(byIdParamsSchema, 'params'), getUserProfile);

export default router;