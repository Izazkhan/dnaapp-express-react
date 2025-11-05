import express from 'express';
import { protect } from '../app/middlewares/authMiddleware.js';
import { getUserById } from '../app/controllers/userController.js';

const router = express.Router();

router.use(protect); // add middleware to protect routes
// All routes below are protected
router.get('/:id', getUserById);

export default router;