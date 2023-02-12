const router = require('express').Router();
const homeController = require('./controllers/homeController');
const authController = require('./controllers/authControllers');
const cryptoController = require('./controllers/cryptoControllers');

router.get('/', homeController.getHomePage);
router.get('/register', authController.getRegisterPage);
router.get('/login', authController.getLoginrPage);
router.get('/catalog', cryptoController.getCatalogPage);
router.get('/search', cryptoController.getSearchPage);
router.get('/create', cryptoController.getCreateOfferPage);

module.exports = router;