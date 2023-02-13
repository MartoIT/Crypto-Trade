const Crypto = require('../Models/CryptoOffert');
const User = require('../Models/User');

exports.createCryptoOffer = async ( name, image, price, description, payment, owner ) => {
        await Crypto.create({name, image, price, description, payment, owner })
}

exports.BuyCryptoAndAddOwner = async (buyerId, cryptoId) => {
        const user = await User.findByIdAndUpdate(buyerId, cryptoId);
        console.log(user)
        //user.buy.push(cryptoId);
}

