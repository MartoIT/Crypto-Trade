const authService = require('../services/authService');
const bcrypt = require('bcrypt')

exports.getRegisterPage = (req, res) => {

    res.render('auth/register')
};


exports.getLoginrPage = (req, res) => {

    res.render('auth/login')
}

exports.postRegisterPage = async (req, res) => {
    const {username, email, password, repass } = req.body;
    
    if(password !== repass) {
        throw new Error (`Email or password is wrong!`)
        
    };

    const isExisteUserByEmail = await authService.getUserByEmail(email);
    if(isExisteUserByEmail){
        throw new Error (`This user is already exist!`)
    };
    
   const token=  await authService.registerUser(username, email, password);
   res.cookie('auth', token, { httpOnly: true });

    res.redirect('/');

}


exports.postLoginPage = async (req, res) => {
    const { email, password } = req.body;
    const isExisteUserByEmail = await authService.getUserByEmail(email);

    if(!isExisteUserByEmail){
        throw new Error('email or password missmach!')
    }
    const token = await authService.loginUser(email, password);
    res.cookie('auth', token, {httpOnly: true});
    res.redirect('/');
}

exports.logout = (req, res) => {
    res.clearCookie('auth');
    res.redirect('/');
}