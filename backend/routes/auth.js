import express from 'express';
import { login, signup, getUser, updateUser } from '../controllers/authController.js';
import { authenticate } from '../middlewares/authenticate.js';

const router = express.Router();

router.post('/login', login);
router.post('/signup', signup);
router.get('/user', authenticate, getUser);
router.put('/user', authenticate, updateUser);

export default router;
