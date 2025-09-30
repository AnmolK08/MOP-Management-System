import express from 'express'
import isAuthenticated from '../middleware/isAuthenticated.js';
import { fetchMenu, fetchUser } from '../controller/fetch.controller.js';

const router = express.Router();

router.get('/fetchMenu', isAuthenticated, fetchMenu);
router.get('/fetchUser', isAuthenticated, fetchUser)

export default router;