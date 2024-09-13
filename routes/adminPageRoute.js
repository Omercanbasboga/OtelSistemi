import express from 'express';
import * as adminPageController from '../controllers/adminPageController.js';
import * as authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

router
    .route('/login')
    .get(adminPageController.getLoginPage);
router
    .route('/add')
    .get(authMiddleware.jwtAuthMiddleware, adminPageController.getAddPage);
router
    .route('/edit')
    .get(authMiddleware.jwtAuthMiddleware, adminPageController.getEditPage);
router
    .route('/reservation')
    .get(authMiddleware.jwtAuthMiddleware, adminPageController.getReservationPage);

export default router;