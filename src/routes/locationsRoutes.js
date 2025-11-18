import express from 'express';
import locationController from '../app/controllers/locationController.js';

const router = express.Router();

router.get('/cities/search', locationController.search);

export default router;