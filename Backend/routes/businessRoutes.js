import Router from 'express';
import { getDashboard } from '../controllers/businessController.js';
import { verifyToken, verifyRefreshToken } from '../middleware/authTolkien.js';

const router = Router();

router.get('/info', verifyToken, getDashboard);

export default router;