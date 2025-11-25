import express from 'express';
import { protect } from '../app/middlewares/authMiddleware.js';
import AdCampaignsController from '../app/controllers/adCampaignsController.js';
import { validateCreateCampaign } from '../app/validators/campaignValidator.js';
import { validate } from '../app/middlewares/validationMiddleware.js';
const router = express.Router();

router.use(protect);

router.post('/', validate(validateCreateCampaign), AdCampaignsController.create);
router.get('/', AdCampaignsController.getAll);
router.get('/options', AdCampaignsController.options);
router.get('/:id', AdCampaignsController.get);
// router.get('/location-search', AdCampaignsController.getLocation);

export default router;
