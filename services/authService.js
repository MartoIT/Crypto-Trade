const User = require('../Models/User');
const jwt = require('../lib/jwt');

exports.getUserByEmail = (email) => User.findOne({email});

exports.registerUser = (username, email, password) => User.create({username, email, password});