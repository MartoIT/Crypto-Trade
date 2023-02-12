const User = require('../Models/User');
const jwt = require('../lib/jwt');
const bcrypt = require('bcrypt')

exports.getUserByEmail = (email) => User.findOne({email});

exports.registerUser = async (username, email, password) => {
    const bcryptPass = await bcrypt.hash(password, 4);
    const user = await User.create({username, email, password: bcryptPass});

    const payload = { _id: user._id, username: user.username };
    const token = await jwt.sign(payload, 'secret');
    return token
} 
