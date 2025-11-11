import express from 'express';
import { protect } from '../app/middlewares/authMiddleware.js';
import AdCampaignsController from '../app/controllers/adCampaignsController.js';
import { validateCreateCampaign } from '../app/validators/campaignValidator.js';
import { validate } from '../app/middlewares/validationMiddleware.js';
const router = express.Router();

router.use(protect);

router.post('/', validate(validateCreateCampaign), AdCampaignsController.create);

export default router;
