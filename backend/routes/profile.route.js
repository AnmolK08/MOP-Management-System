import express from 'express';
import isAuthenticated from '../middleware/isAuthenticated.js';
import { editPass } from '../controller/profile.controller.js';

const router = express.Router();

router.post('/editPass' , isAuthenticated , editPass);

export default router;


