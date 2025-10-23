import express from 'express';
import authRoutes from './authRoutes.js';
import userRoutes from './userRoutes.js';
import businessRoutes from './businessRoutes.js';
import chatBotRoutes from './chatBotRoutes.js';
import taskRoutes from './taskRoutes.js';
import notificationRoutes from './notificationRoutes.js';
import categoryRoutes from './categoryRoutes.js';
import feedbackRoutes from './feedbackRoutes.js';
import projectRoutes from './projectRoutes.js';
import gnnRoutes from './gnnRoutes.js';
import config from '../config/config.js';
import { validator } from '../middleware/validators/joiConfig.js';
import { emptyQuery } from '../middleware/validators/generalValidator.js';

const router = express.Router();

// Appends to api:
router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/business', businessRoutes);
// router.use('/chat', chatRoutes);
router.use('/chatbot', chatBotRoutes);
router.use('/tasks', taskRoutes);
router.use('/notifications', notificationRoutes);
router.use('', categoryRoutes);
router.use('/feedback', feedbackRoutes);
// router.use('/connect', connectRoutes);
// router.use('/manage', manageRoutes);
router.use('/projects', projectRoutes);
router.use('/gnn', gnnRoutes);
// router.use('/references', referenceRoutes);

// Redirect to dashboard for users, devs get direct access to api
if (config.env === 'production') {
    const redirectUrl = `${config.FRONTEND_BASE_URL}/dashboard`;
    router.get('/', validator(emptyQuery, 'query'), (req, res) => {
        res.render('redirect', {
            success: false,
            message: 'Redirecting to dashboard...',
            redirectUrl: redirectUrl,
            timeout: 0
        });
    });
} else if (config.env === 'development' || config.env === 'test') {
    router.get('/', validator(emptyQuery, 'query'), (req, res) => {
        res.json({ message: 'API is working' });
    });
}

export default router;