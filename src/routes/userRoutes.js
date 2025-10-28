import express from 'express';
import { protect } from '../app/middlewares/authMiddleware.js';

const router = express.Router();

// All routes below are protected
router.use(protect);

export default router;