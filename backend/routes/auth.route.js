import express from 'express';
import { login, register, verifyEmail, logout, refresh } from '../controller/auth.controller.js';
import isAuthenticated from '../middleware/isAuthenticated.js';

export const router = express.Router();

router.post('/login',login);
router.post('/register', register)
router.get("/verify-email", verifyEmail)
router.post("/refresh", refresh)
router.get("/logout", isAuthenticated, logout)

export default router;