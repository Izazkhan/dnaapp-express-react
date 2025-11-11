import express from 'express';
import AuthController from '../app/controllers/authController.js';
import { validateRegister, validateLogin } from '../app/validators/authValidator.js';
import { validate } from '../app/middlewares/validationMiddleware.js';

const router = express.Router();

router.post('/register', validate(validateRegister), AuthController.register);
router.post('/login', validate(validateLogin), AuthController.login);
router.post('/logout', AuthController.logout);
router.post('/password-reset', AuthController.resetPassword);
// forgot-password
router.post('/forgot-password', AuthController.forgotPassword);
router.post('/refresh-token', AuthController.refreshToken);

export default router;