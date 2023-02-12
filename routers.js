const router = require('express').Router();
const homeController = require('./controllers/homeController');
const authController = require('./controllers/authControllers');

router.get('/', homeController.getHomePage);
router.get('/register', authController.getRegisterPage);
router.get('/login', authController.getLoginrPage);

module.exports = router;