const Crypto = require('../Models/CryptoOffert');
const User = require('../Models/User');

exports.createCryptoOffer = async ( name, image, price, description, payment, owner ) => {
        await Crypto.create({name, image, price, description, payment, owner })
}

exports.BuyCryptoAndAddOwner = async (buyerId, cryptoId) => {
        
        const crypto = await Crypto.findById(cryptoId)
        crypto.buy.push(buyerId);
        await crypto.save();
}
exports.delete = async (cryptoId) => {
        await Crypto.findByIdAndDelete(cryptoId);
        
}

exports.getOne = async (id) => {
        const cruptoData = await Crypto.findById(id).lean();
        return cruptoData;
}

exports.edit = async (id, data) => {
        await Crypto.findByIdAndUpdate(id, data);
}
