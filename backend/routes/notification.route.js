import express from 'express';
import { clearNotificationsForUser, deleteNotification, getNotificationsForUser } from '../controller/notifications.controller.js';
import isAuthenticated from '../middleware/isAuthenticated.js';

const router = express.Router();

router.get('/getAll', isAuthenticated, getNotificationsForUser);
router.delete('/delete/:id', isAuthenticated, deleteNotification);
router.delete('/clearAll', isAuthenticated, clearNotificationsForUser);

export default router;
