import express from 'express';
import isProvider from '../middleware/isProvider.js';
import { deleteMenu, getLatestMenu, menuUpload, updateMenu } from '../controller/provider.controller.js';
import isAuthenticated from '../middleware/isAuthenticated.js';

const router = express.Router();

router.post('/menuUpload', isAuthenticated, isProvider, menuUpload);
router.delete('/deleteMenu/:id', isAuthenticated, isProvider, deleteMenu);
router.patch('/updateMenu/:menuId', isAuthenticated, isProvider, updateMenu);
router.get('/getLatestMenu', isAuthenticated, isProvider, getLatestMenu);

export default router;