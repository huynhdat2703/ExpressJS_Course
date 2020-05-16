/**
 * Import Database
 */
const db = require('../util/db');

function checkLogin(req, res) {
    var email = req.body.email;
    var phone = req.body.phone;

    var loginUser = db.get('users').find({ email: email }).value();

    if (!loginUser) {
        res.render('index', { errorMessage: "Email does not exist!" });
        return;
    }

    if (loginUser.phone !== phone) {
        res.render('index', { errorMessage: "Phone Number is wrong!" });
        return;
    }

    res.cookie('uID', loginUser.id);
    res.redirect('/user/');
}

function checkCookie(req, res, next) {
    if (!req.cookies.uID) {
        res.redirect('/');
        return;
    }
    next();
}

module.exports = {
    checkLogin,
    checkCookie
};