import express from 'express';
import * as reservationController from '../controllers/reservationController.js';
import * as authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

router
    .route('/reservations')
    .get(authMiddleware.jwtAuthMiddleware, reservationController.getReservations);
router
    .route('/reservations')
    .post(reservationController.createReservation);
router
    .route('/updateReservation/:id')
    .put(authMiddleware.jwtAuthMiddleware, reservationController.updateReservation);
router
    .route('/deleteReservation/:id')
    .delete(authMiddleware.jwtAuthMiddleware, reservationController.deleteReservation);

export default router;