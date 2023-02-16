const Crypto = require('../Models/CryptoOffert');
const User = require('../Models/User');

exports.createCryptoOffer = async ( name, image, price, description, payment, owner ) => {
        await Crypto.create({name, image, price, description, payment, owner })
}

exports.BuyCryptoAndAddOwner = async (buyerId, data) => {

        //const user1 = await User.findById(buyerId)
        const user = await User.findByIdAndUpdate(buyerId, data);
        console.log(user)
        //user.buy.push(cryptoId);
}

exports.checkCryptoOwner = async (req, res) => {
        
}

