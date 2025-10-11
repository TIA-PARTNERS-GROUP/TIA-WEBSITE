import Router from 'express';
import { addApplicant, addProject, getProject, updateProject, deleteProject, getMyProjects, getAppliedProjects } from '../controllers/projectController.js';
import { verifyToken } from '../middleware/authTolkien.js';
const router = Router();

router.post('/', verifyToken, addProject);
router.post('/:id/applicants', verifyToken, addApplicant);
router.patch('/:id', verifyToken, updateProject);
router.get('/my', verifyToken, getMyProjects);
router.get('/applied', verifyToken, getAppliedProjects);
router.get('/:id', getProject);
router.delete('/:id', verifyToken, deleteProject);


export default router;