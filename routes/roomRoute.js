import express from 'express';
import * as roomController from '../controllers/roomController.js';
import * as authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

router
    .route('/addRoom')
    .post(authMiddleware.jwtAuthMiddleware, roomController.createRoom);

router
    .route('/updateRoom/:id')
    .put(authMiddleware.jwtAuthMiddleware, roomController.updateRoom);
router
    .route('/deleteRoom/:id')
    .delete(authMiddleware.jwtAuthMiddleware, roomController.deleteRoom); 
router
    .route('/')
    .get(authMiddleware.jwtAuthMiddleware, roomController.getRooms); 

export default router;