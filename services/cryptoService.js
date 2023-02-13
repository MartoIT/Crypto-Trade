const Crypto = require('../Models/CryptoOffert');

exports.createCryptoOffer = async ( name, image, price, description, payment ) => {
        await Crypto.create({name, image, price, description, payment });
}