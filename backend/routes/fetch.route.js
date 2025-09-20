import express from 'express'
import isAuthenticated from '../middleware/isAuthenticated.js';
import { fetchMenu } from '../controller/fetch.controller.js';

const router = express.Router();

router.get('/fetchMenu', isAuthenticated, fetchMenu);

export default router;