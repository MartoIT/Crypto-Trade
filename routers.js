const router = require('express').Router();
const homeController = require('./controllers/homeController');
const authController = require('./controllers/authControllers');
const cryptoController = require('./controllers/cryptoControllers');

router.get('/', homeController.getHomePage);
router.get('/register', authController.getRegisterPage);
router.post('/register', authController.postRegisterPage);

router.get('/login', authController.getLoginrPage);
router.post('/login', authController.postLoginPage);

router.get('/logout', authController.logout);

router.get('/catalog', cryptoController.getCatalogPage);
router.get('/crypto/details/:cryptoId', cryptoController.getDetailsPage);

router.get('/search', cryptoController.getSearchPage);

router.get('/create', cryptoController.getCreateOfferPage);
router.post('/create', cryptoController.postCreateOffer);

module.exports = router;