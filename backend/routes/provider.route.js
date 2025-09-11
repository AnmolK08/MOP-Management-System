import express from 'express';
import isProvider from '../middleware/isProvider.js';
import { deleteMenu, menuUpload } from '../controller/provider.controller.js';

const router = express.Router();

router.post('/menuUpload', isProvider, menuUpload);
router.delete('/deleteMenu/:id', isProvider, deleteMenu);

export default router;