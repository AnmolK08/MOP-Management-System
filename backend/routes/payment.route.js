import express from 'express'
import { amountAdded } from '../controller/payment.controller.js';
import isAuthenticated from '../middleware/isAuthenticated.js';
import isProvider from '../middleware/isProvider.js';

const router = express.Router();

router.post('/addAmount/:userId', isAuthenticated, isProvider, amountAdded);

export default router;