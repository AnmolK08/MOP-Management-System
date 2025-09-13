import express from 'express';
import isProvider from '../middleware/isProvider.js';
import { deleteMenu, menuUpload } from '../controller/provider.controller.js';
import isAuthenticated from '../middleware/isAuthenticated.js';

const router = express.Router();

router.post('/menuUpload', isAuthenticated, isProvider, menuUpload);
router.delete('/deleteMenu/:id', isAuthenticated, isProvider, deleteMenu);

export default router;