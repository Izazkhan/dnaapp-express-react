import express from 'express';
import { protect } from '../app/middlewares/authMiddleware.js';
import { getUserById } from '../app/controllers/userController.js';

const router = express.Router();

// All routes below are protected
router.get('/:id', getUserById);
router.use(protect);

export default router;