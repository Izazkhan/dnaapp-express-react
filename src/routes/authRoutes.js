import express from 'express';
import { register, login, refreshToken } from '../app/controllers/authController.js';
import { validateRegister, validateLogin } from '../app/validators/authValidator.js';
import { validate } from '../app/middlewares/validationMiddleware.js';

const router = express.Router();

router.post('/register', validate(validateRegister), register);
router.post('/login', validate(validateLogin), login);
router.post('/refresh-token', refreshToken);

export default router;