import Router from 'express';
import { sendMessage } from '../controllers/chatBotController.js'
import { verifyToken } from '../middleware/authTolkien.js';

const router = Router();

// POST /chatbot/message
// add ,verifyToken 
router.post('/message', verifyToken, sendMessage)

export default router;