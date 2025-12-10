import express from 'express';
import isProvider from '../middleware/isProvider.js';
import { announcementMsg, deleteMenu, deleteUser, generateQRToken, getAllUsers, getLatestMenu, menuUpload, togglePremium, updateMenu } from '../controller/provider.controller.js';
import isAuthenticated from '../middleware/isAuthenticated.js';

const router = express.Router();

router.post('/menuUpload', isAuthenticated, isProvider, menuUpload);
router.delete('/deleteMenu/:id', isAuthenticated, isProvider, deleteMenu);
router.patch('/updateMenu/:menuId', isAuthenticated, isProvider, updateMenu);
router.get('/getLatestMenu', isAuthenticated, isProvider, getLatestMenu);
router.get('/getAllUsers' , isAuthenticated, isProvider , getAllUsers);
router.patch('/togglePremium/:customerId' , isAuthenticated, isProvider , togglePremium);
router.delete('/deleteUser/:userId' , isAuthenticated, isProvider , deleteUser);
router.post('/announceMsg' , isAuthenticated, isProvider , announcementMsg);
router.get("/generateQRToken", isAuthenticated, isProvider, generateQRToken);

export default router;