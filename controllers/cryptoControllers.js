const createCrypto = require('../services/cryptoService');
const Crypto = require('../Models/CryptoOffert');
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
    const crypto = await cryptoService.getOne(req.params.cryptoId);
    const isOwner = crypto.owner == req.user?._id;
    const isBuyer = crypto.buy.some(id => id == req.user._id);
    res.render(`crypto/details`, { crypto, isOwner, isBuyer })
};

exports.getEditPage = async (req, res) => {
    const currentCrypto = await cryptoService.getOne(req.params.cryptoId);
    res.render('crypto/edit', currentCrypto);
};

exports.getSearchPage = (req, res) => {
    res.render('crypto/search');
};


exports.postCreateOffer = async (req, res) => {
    const { name, image, price, description, payment } = req.body;
    const owner = req.user._id;
    await createCrypto.createCryptoOffer(name, image, price, description, payment, owner);

    res.redirect('/catalog');
}

exports.postBuyCrypto = async (req, res) => {
    const cryptoId = req.params.curentCryptoId;
    const token = req.cookies['auth'];
    const decodedToken = await jwt.verify(token, 'secret');
    const buyerId = decodedToken._id;

    await cryptoService.BuyCryptoAndAddOwner(buyerId, cryptoId);
    res.redirect('/catalog');
}

exports.postEditPage = async (req, res) => {
    const id = req.params.cryptoId;
    const data = req.body;
    
    await cryptoService.edit(id, data);
    
    const crypto = await cryptoService.getOne(id);
    const isOwner = crypto.owner == req.user?._id;
    const isBuyer = crypto.buy.some(id => id == req.user._id);
    res.render(`crypto/details`, { crypto, isOwner, isBuyer })


}

exports.delete = async (req, res) => {
    const cryptoId = req.params.cryptoId;

    await cryptoService.delete(cryptoId);

    res.redirect('/catalog');

}