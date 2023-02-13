const createCrypto = require('../services/cryptoService');
const Crypto = require('../Models/CryptoOffert');


exports.getCatalogPage = async (req, res) => {
    const cryptoOffers = await Crypto.find().lean()
    res.render('crypto/catalog', {cryptoOffers});
};

exports.getCreateOfferPage = (req, res) => {
    res.render('crypto/create');
};

exports.getDetailsPage = (req, res) => {
    res.render('crypto/details')
};

exports.getEditPage = (req, res) => {
    res.render('crypto/edit')
};

exports.getSearchPage = (req, res) => {
    res.render('crypto/search')
};


exports.postCreateOffer = async (req, res) => {
    const { name, image, price, description, payment } = req.body;
    await createCrypto.createCryptoOffer(name, image, price, description, payment);
   
    res.redirect('/catalog')
}