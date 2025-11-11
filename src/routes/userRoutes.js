import express from 'express';
import { protect } from '../app/middlewares/authMiddleware.js';
import UserAuthController from '../app/controllers/userController.js';

const router = express.Router();

router.use(protect); // add middleware to protect routes
// All routes below are protected
router.get('/:id', UserAuthController.getUserById);
router.put('/:id', UserAuthController.updateMe);

export default router;