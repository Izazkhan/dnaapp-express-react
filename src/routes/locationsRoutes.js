import express from 'express';
import locationController from '../app/controllers/locationController.js';

const router = express.Router();

router.get('/search', locationController.search);

export default router;