const User = require('../Models/User');
const jwt = require('../lib/jwt');
const bcrypt = require('bcrypt')

exports.getUserByEmail = (email) => User.findOne({ email });

exports.registerUser = async (username, email, password) => {
    const bcryptPass = await bcrypt.hash(password, 4);
    const user = await User.create({ username, email, password: bcryptPass });

    const payload = { _id: user._id, username: user.username };
    const token = await jwt.sign(payload, 'secret');
    return token
}


exports.loginUser = async (email, password) => {
    const user = await this.getUserByEmail(email);
    if (!user) {
        throw new Error(`User or password is wrong!`)
    }
    try {
        await bcrypt.compare(user.password, password);
        const payload = { _id: user._id, username: user.username };
        const token = await jwt.sign(payload, 'secret');
        return token

    } catch (err) {
        console.log(err.message)
    }


}


