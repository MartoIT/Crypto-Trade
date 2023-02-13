const createCrypto = require('../services/cryptoService');
const Crypto = require('../Models/CryptoOffert');
const isOwner = require('../utils/cryptoUtils')

exports.getCatalogPage = async (req, res) => {
    
    const cryptoOffers = await Crypto.find().lean()
    res.render('crypto/catalog', {cryptoOffers});
};


exports.getCreateOfferPage = (req, res) => {
    res.render('crypto/create');

};

exports.getDetailsPage = async (req, res) => {
    const currentCrypto = await Crypto.findById(req.params.cryptoId).lean();
    const owner = await isOwner.isOwner(req.user, currentCrypto)
    const token = req.cookies['auth'];
    console.log(token);
    res.render(`crypto/details`, {currentCrypto, owner, token});
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
    console.log(req.user._id)
    await createCrypto.createCryptoOffer(name, image, price, description, payment, owner);
   
    res.redirect('/catalog')
}