import express from 'express'
import authRoutes from './authRoutes.js';
import config from '../config/config.js'

const router = express.Router();

// Appends to api:
router.use('/auth', authRoutes);
// router.use('/users', userRoutes);
// router.use('/chat', chatRoutes);
// router.use('/chatbot', chatBotRoutes);
// router.use('/connect', connectRoutes);
// router.use('/manage', manageRoutes);
// router.use('/projects', projectRoutes);
// router.use('/references', referenceRoutes);

// Redirect to dashboard for users, devs get direct access to api
if (config.env === 'production') {
    const redirectUrl = `${config.FRONTEND_BASE_URL}/dashboard`;
    router.get('/', (req, res) => {
        res.render('redirect', {
            success: false,
            message: 'Redirecting to dashboard...',
            redirectUrl: redirectUrl,
            timeout: 0
        });
    });
} else if (config.env === 'development') {
    router.get('/', (req, res) => {
        res.json({ message: 'API is working' });
    });
}

export default router;