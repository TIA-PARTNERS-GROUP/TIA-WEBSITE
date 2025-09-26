import Router from 'express';
import { getAllTasks, getTaskById, getUserTasks, enrollUserInTask, unenrollUserFromTask, getTaskProgress, getDailyProgress, updateTaskProgress } from '../controllers/taskController.js';
import { verifyToken, verifyRefreshToken } from '../middleware/authTolkien.js';

const router = Router();

  /**
   * @swagger
   * /api/tasks:
   *   get:
   *     tags: [Tasks]
   *     summary: Get all tasks
   *     description: Retrieve a list of all daily activities/tasks
   *     security:
   *       - bearerAuth: []
   *     responses:
   *       200:
   *         description: A list of tasks
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/Task'
   *       401:
   *         description: Unauthorized
   */
  router.get('/', verifyToken, getAllTasks);

  /**
   * @swagger
   * /api/tasks/{taskId}:
   *   get:
   *     tags: [Tasks]
   *     summary: Get a task by ID
   *     description: Retrieve a single task by its ID
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: path
   *         name: taskId
   *         required: true
   *         schema:
   *           type: integer
   *         description: ID of the task to retrieve
   *     responses:
   *       200:
   *         description: Task details
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Task'
   *       404:
   *         description: Task not found
   *       401:
   *         description: Unauthorized
   */
  router.get('/:taskId', verifyToken, getTaskById);

  /**
   * @swagger
   * /api/tasks/user/{userId}:
   *   get:
   *     tags: [Tasks]
   *     summary: Get user's tasks
   *     description: Get all tasks for a specific user
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: path
   *         name: userId
   *         required: true
   *         schema:
   *           type: integer
   *         description: ID of the user
   *     responses:
   *       200:
   *         description: List of user's tasks
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/Task'
   *       401:
   *         description: Unauthorized
   */
  router.get('/user/:userId', verifyToken, getUserTasks);

  /**
   * @swagger
   * /api/tasks/{taskId}/enroll/{userId}:
   *   post:
   *     tags: [Tasks]
   *     summary: Enroll user in task
   *     description: Enroll a user in a specific task
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: path
   *         name: taskId
   *         required: true
   *         schema:
   *           type: integer
   *         description: ID of the task
   *       - in: path
   *         name: userId
   *         required: true
   *         schema:
   *           type: integer
   *         description: ID of the user
   *     responses:
   *       201:
   *         description: User enrolled successfully
   *       400:
   *         description: User already enrolled
   *       404:
   *         description: Task not found
   *       401:
   *         description: Unauthorized
   */
  router.post('/:taskId/enroll/:userId', verifyToken, enrollUserInTask);

  /**
   * @swagger
   * /api/tasks/{taskId}/unenroll/{userId}:
   *   delete:
   *     tags: [Tasks]
   *     summary: Unenroll user from task
   *     description: Remove user's enrollment from a specific task
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: path
   *         name: taskId
   *         required: true
   *         schema:
   *           type: integer
   *         description: ID of the task
   *       - in: path
   *         name: userId
   *         required: true
   *         schema:
   *           type: integer
   *         description: ID of the user
   *     responses:
   *       204:
   *         description: User unenrolled successfully
   *       400:
   *         description: User not enrolled in task
   *       401:
   *         description: Unauthorized
   */
  router.delete('/:taskId/unenroll/:userId', verifyToken, unenrollUserFromTask);

  /**
   * @swagger
   * /api/tasks/progress/{userId}/{taskId}/{date}:
   *   get:
   *     tags: [Tasks]
   *     summary: Get user's progress for a specific task
   *     description: Get a user's progress for a specific task on a given date
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: path
   *         name: userId
   *         required: true
   *         schema:
   *           type: integer
   *         description: ID of the user
   *       - in: path
   *         name: taskId
   *         required: true
   *         schema:
   *           type: integer
   *         description: ID of the task
   *       - in: path
   *         name: date
   *         required: true
   *         schema:
   *           type: string
   *           format: date
   *         description: The date in YYYY-MM-DD format
   *     responses:
   *       200:
   *         description: User's progress for the task
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 progress:
   *                   type: integer
   *                   description: Progress percentage (0-100)
   *       400:
   *         description: Invalid date format
   *       403:
   *         description: User not enrolled in task
   *       404:
   *         description: Task not found
   */
  router.get('/progress/:userId/:taskId/:date', verifyToken, getTaskProgress);

  /**
   * @swagger
   * /api/tasks/progress/{userId}/{date}:
   *   get:
   *     tags: [Tasks]
   *     summary: Get user's daily progress
   *     description: Get a user's progress for all enrolled tasks on a given date
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: path
   *         name: userId
   *         required: true
   *         schema:
   *           type: integer
   *         description: ID of the user
   *       - in: path
   *         name: date
   *         required: true
   *         schema:
   *           type: string
   *           format: date
   *         description: The date in YYYY-MM-DD format
   *     responses:
   *       200:
   *         description: List of tasks with progress
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 type: object
   *                 required:
   *                   - id
   *                   - name
   *                   - description
   *                   - progress
   *                 properties:
   *                   id:
   *                     type: integer
   *                     description: The task ID
   *                   name:
   *                     type: string
   *                     description: The name of the task
   *                   description:
   *                     type: string
   *                     description: Detailed description of the task
   *                   progress:
   *                     type: integer
   *                     minimum: 0
   *                     maximum: 100
   *                     description: Progress percentage (0-100)
   *       400:
   *         description: Invalid date format
   */
  router.get('/progress/:userId/:date', verifyToken, getDailyProgress);

  /**
   * @swagger
   * /api/tasks/progress/{userId}/{taskId}/{date}:
   *   put:
   *     tags: [Tasks]
   *     summary: Update user's task progress
   *     description: Update a user's progress for a specific task on a given date
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: path
   *         name: userId
   *         required: true
   *         schema:
   *           type: integer
   *         description: ID of the user
   *       - in: path
   *         name: taskId
   *         required: true
   *         schema:
   *           type: integer
   *         description: ID of the task
   *       - in: path
   *         name: date
   *         required: true
   *         schema:
   *           type: string
   *           format: date
   *         description: The date in YYYY-MM-DD format
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - progress
   *             properties:
   *               progress:
   *                 type: integer
   *                 minimum: 0
   *                 maximum: 100
   *                 description: Progress percentage (0-100)
   *     responses:
   *       200:
   *         description: Progress updated successfully
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               required:
   *                 - message
   *               properties:
   *                 message:
   *                   type: string
   *                   example: 'Progress updated successfully'
   *       400:
   *         description: Invalid progress value or date format
   *       403:
   *         description: User not enrolled in task
   *       404:
   *         description: Task not found
   */
  router.put('/progress/:userId/:taskId/:date', verifyToken, updateTaskProgress);

  /**
   * @swagger
   * components:
   *   schemas:
   *     Task:
   *       type: object
   *       required:
   *         - id
   *         - name
   *         - description
   *       properties:
   *         id:
   *           type: integer
   *           description: The task ID
   *         name:
   *           type: string
   *           description: The name of the task
   *         description:
   *           type: string
   *           description: Detailed description of the task
   */

export default router;