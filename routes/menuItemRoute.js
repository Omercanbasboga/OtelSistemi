import express from 'express';
import * as menuItemController from '../controllers/menuItemController.js';
import * as authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

router
    .route('/addMenuItem')
    .post(authMiddleware.jwtAuthMiddleware, menuItemController.addMenuItem);
router
    .route('/')
    .get(menuItemController.getMenuItems);
router
    .route('/:taste')
    .get(menuItemController.getMenuItemsWTaste);
router
    .route('/updateMenuItem/:id')
    .put(authMiddleware.jwtAuthMiddleware, menuItemController.updateMenuItem);
router
    .route('/deleteMenuItem/:id')
    .delete(authMiddleware.jwtAuthMiddleware, menuItemController.deleteMenuItem);

export default router;