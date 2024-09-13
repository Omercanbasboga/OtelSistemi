import express from 'express';
import * as pageController from '../controllers/pageController.js';

const router = express.Router();

router
    .route('/')
    .get(pageController.getIndexPage);
router
    .route('/about')
    .get(pageController.getAboutPage);
router
    .route('/services')
    .get(pageController.getServicesPage);
router
    .route('/contact')
    .get(pageController.getContactPage);
router
    .route('/contact')
    .post(pageController.sendMail);
router
    .route('/rooms')
    .get(pageController.getRoomsPage);
router
    .route('/ourTeam')
    .get(pageController.getOurTeamPage);
router
    .route('/menus')
    .get(pageController.getMenusPage);

export default router;