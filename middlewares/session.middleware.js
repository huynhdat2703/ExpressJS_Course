const shortID = require('shortid');

function checkSession(req, res, next) {
    var sessionID = req.signedCookies.sessionID;
    
    if (!sessionID) {
        res.cookie('sessionID', shortID.generate(), { 'signed': true });
    }
    next();
}

module.exports = {
    checkSession
};