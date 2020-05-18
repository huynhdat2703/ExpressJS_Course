/**
 * Import module MD5
 */
const md5 = require('md5');

/**
 * Import Database
 */
const db = require('../util/db');

/**
 * Check Login User
 */
function checkLogin(req, res) {
    var email = req.body.email;
    var password = md5(req.body.password);

    var loginUser = db.get('users').find({ email: email }).value();

    if (!loginUser) {
        res.render('index', { errorMessage: "Email does not exist!" });
        return;
    }

    if (loginUser.password !== password) {
        res.render('index', { errorMessage: "Password is wrong!" });
        return;
    }

    res.cookie('signedCookie', loginUser.id, { 'signed': true });
    res.redirect('/user/');
}

module.exports = {
    checkLogin
};