const createCrypto = require('../services/cryptoService');
const Crypto = require('../Models/CryptoOffert');
const jwt = require('../lib/jwt');
const cryptoService = require('../services/cryptoService');

//const  paymentMetod  = require('../utils/cryptoUtils');

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
    const crypto = await cryptoService.getOne(req.params.cryptoId);
    const paymentMetod  = {
        "crypto-wallet": 'Crypto Wallet',
        "credit-card": 'Credit Card',
        "debit-card": 'Debit Card',
        "paypal": 'PayPal'
    }
    
    const payment = Object.keys(paymentMetod).map(key => ({
        value: key,
        label: paymentMetod[key],
        isSelected: crypto.payment == key,
    }))
    
    res.render('crypto/edit', {crypto, payment});
};

exports.getSearchPage = async (req, res) => {
    //const cryptoOffers = await Crypto.find().lean()
    const {name, payment} = req.query;
    console.log(name)
    const crypto = await cryptoService.search(name, payment);
    res.render('crypto/search', {crypto, payment});
};

// exports.getSearchPage = async (req, res) => {
//     const cryptoOffers = await Crypto.find().lean()
    
//     res.render('crypto/search', {cryptoOffers});
// };


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