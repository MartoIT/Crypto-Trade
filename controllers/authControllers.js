const authService = require('../services/authService');
const bcrypt = require('bcrypt');
const getErrorMessage = require('../utils/errorMessage');

exports.getRegisterPage = (req, res) => {

    res.render('auth/register')
};


exports.getLoginrPage = (req, res) => {

    res.render('auth/login')
}

exports.postRegisterPage = async (req, res) => {
    const { username, email, password, repass } = req.body;

    if(password !== repass){
       return res.status(404).render('auth/register', { error: getErrorMessage.getErrorMessage('Password\'s is missmach!!!') });
    }

    try {
        const token = await authService.registerUser(username, email, password);
        res.cookie('auth', token, { httpOnly: true });

        res.redirect('/');
    } catch (error) {
        res.status(404).render('auth/register', { error: getErrorMessage.getErrorMessage(error) })
    }





}


exports.postLoginPage = async (req, res) => {
    const { email, password } = req.body;

    try {
        const token = await authService.loginUser(email, password);
        res.cookie('auth', token, { httpOnly: true });
        res.redirect('/');
    } catch (error) {
        res.status(404).render('auth/login', { error: getErrorMessage.getErrorMessage(error) })
    }

}

exports.logout = (req, res) => {
    res.clearCookie('auth');
    res.redirect('/');
}