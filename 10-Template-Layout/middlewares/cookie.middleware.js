/**
* Import DB
*/
const db = require('../util/db');

/**
 * Check Cookie
 */
function checkCookie(req, res, next) {
    if (!req.signedCookies.signedCookie) {
        res.redirect('/');
        return;
    }

    var loginUser = db.get('users').find({ id: req.signedCookies.signedCookie }).value();
    res.locals.loginUser = loginUser;

    next();
}

module.exports = {
    checkCookie
};