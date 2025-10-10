import Router from 'express';
import { addProject } from '../controllers/projectController.js';
import { verifyToken } from '../middleware/authTolkien.js';
const router = Router();

router.post('/', verifyToken, addProject)


export default router;