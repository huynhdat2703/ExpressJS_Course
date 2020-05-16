/**
 * Check Cookie
 */
function checkCookie(req, res, next) {
    if (!req.cookies.uID) {
        res.redirect('/');
        return;
    }
    next();
}

module.exports = {
    checkCookie
};