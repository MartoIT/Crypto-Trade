const mongoose = require('mongoose');

const cryptoSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    image:{
        type: String,
        required: true,
        
    },
    price:{
        type: Number,
        required: true,
    },
    description:{
        type: String,
        required: true,
    },
    payment:{
        type: String,
        required:[`crypto-wallet, credit-card, debit-card, paypal`],
    },
    owner:{
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    buy:[{
        type: mongoose.Types.ObjectId,
        ref: 'Crypto',
    }]
    

})


const Crypto = mongoose.model('Crypto', cryptoSchema);
module.exports = Crypto;
// •	Buy a crypto - a collection of Users (a reference to the User model)
// •	Owner - object Id (a reference to the User model)
