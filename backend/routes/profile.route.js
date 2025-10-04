import express from 'express';
import isAuthenticated from '../middleware/isAuthenticated.js';
import { editPass, forgetPass, resetPass } from '../controller/profile.controller.js';
import rateLimiting from '../middleware/rateLimiting.js';

const router = express.Router();

router.post('/editPass', isAuthenticated , editPass);
router.post('/forgetPass', rateLimiting, forgetPass);
router.post('/resetPass' , resetPass);

export default router;