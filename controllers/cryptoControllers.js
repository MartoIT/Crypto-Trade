const createCrypto = require('../services/cryptoService');
const Crypto = require('../Models/CryptoOffert');
const isOwner = require('../utils/cryptoUtils')
const jwt = require('../lib/jwt');
const cryptoService = require('../services/cryptoService');

exports.getCatalogPage = async (req, res) => {

    const cryptoOffers = await Crypto.find().lean()
    res.render('crypto/catalog', { cryptoOffers });
};


exports.getCreateOfferPage = (req, res) => {
    res.render('crypto/create');

};

exports.getDetailsPage = async (req, res) => {
    const currentCrypto = await Crypto.findById(req.params.cryptoId).lean();
    const owner = await isOwner.isOwner(req.user, currentCrypto)
    const token = req.cookies['auth'];
    const user =  req.user;
    const crypto = req.params.cryptoId;
    res.render(`crypto/details`, { currentCrypto, owner, token, user, crypto });
};

exports.getEditPage = (req, res) => {
    res.render('crypto/edit')
};

exports.getSearchPage = (req, res) => {
    res.render('crypto/search')
};


exports.postCreateOffer = async (req, res) => {
    const { name, image, price, description, payment } = req.body;
    const owner = req.user._id
    await createCrypto.createCryptoOffer(name, image, price, description, payment, owner);

    res.redirect('/catalog')
}

exports.postBuyCrypto = async (req, res) => {
    const cryptoId = req.params.curentCryptoId;
    const token = req.cookies['auth'];
    const decodedToken = await jwt.verify(token, 'secret');
    const buyerId = decodedToken._id;
    const data = {
        username: buyerId.username,
        emial: buyerId.email,
        password: buyerId.password,
        buy: cryptoId
    }
    // console.log(buyerId);
    // console.log(cryptoId);
    await cryptoService.BuyCryptoAndAddOwner(buyerId, data)
    res.redirect('/');
}