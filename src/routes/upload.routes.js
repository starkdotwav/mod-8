import { Router } from 'express';
import { upload } from '../middlewares/upload.middleware.js';
import { authenticateToken } from '../middlewares/auth.middleware.js';
import { uploadFile } from '../controllers/upload.controller.js';
const router = Router();
router.post('/', authenticateToken, upload.single('file'), uploadFile);
export default router;
