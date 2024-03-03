import { Router } from 'express';
import {
  home,
  login,
  logout,
  postLogin,
  postRegister,
  profile,
  protectedRoute,
  register,
} from '../controllers/session.controller.js';
import { authMiddleware, isLogged } from '../lib/utils.js';

const router = Router();

router.get('/', isLogged, home);
router.get('/login', isLogged, login);
router.get('/register', isLogged, register);
router.get('/protected', authMiddleware, protectedRoute);
router.get('/profile', authMiddleware, profile);
router.get('/logout', logout);

router.post('/login', postLogin);
router.post('/register', postRegister);

export { router as userRoutes };
