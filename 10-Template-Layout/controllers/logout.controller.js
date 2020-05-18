function userLogout(req, res) {
    if (req.signedCookies.signedCookie) {
        res.clearCookie('signedCookie');
        res.redirect('/');
    }
}

module.exports = {
    userLogout
};