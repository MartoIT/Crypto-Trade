const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        reuired: true,
        minLenght: 5,
    },
    email:{
        type: String,
        reuired: true,
        minLenght: 10,
    },
    password:{
        type: String,
        reuired: true
    }
})

const User =  mongoose.model('User', userSchema);
module.exports = User;
