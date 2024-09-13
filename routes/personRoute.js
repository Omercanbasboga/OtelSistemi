import express from 'express';
import * as personController from '../controllers/personController.js';
import * as authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

router
    .route('/addPerson')
    .post(authMiddleware.jwtAuthMiddleware, personController.addPerson);
router
    .route('/login')
    .post(personController.loginPerson);
router
    .route('/profile')
    .get(authMiddleware.jwtAuthMiddleware, personController.getDashboardPage);
router
    .route('/')
    .get(authMiddleware.jwtAuthMiddleware, personController.getPerson);
router
    .route('/:workType')
    .get(personController.getPersonWWorkType);
router
    .route('/updatePerson/:id')
    .put(authMiddleware.jwtAuthMiddleware, personController.updatePerson);
router
    .route('/deletePerson/:id')
    .delete(authMiddleware.jwtAuthMiddleware, personController.deletePerson);

export default router;