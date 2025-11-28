import express from 'express';
import paymentController from '../app/controllers/paymentController.js';
const router = express.Router();

router.post('/create-payment-intent', paymentController.createPaymentIntent);
router.post('/stripe/verify-payment/:id', paymentController.verifyPayment);

export default router;