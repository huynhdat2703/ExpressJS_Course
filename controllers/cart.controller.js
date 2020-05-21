const db = require('../util/db');

function addToCart(req, res) {
    var session = req.signedCookies.sessionID;
    var productID = req.params.productID;

    if (!db.get('sessions').find({ id: session }).value()) {
        db.get('sessions').push({ id: session }).write();
    }

    var count = db.get('sessions')
        .find({ id: session })
        .get('cart.' + productID, 0)
        .value();

    db.get('sessions')
        .find({ id: session })
        .set('cart.' + productID, count + 1)
        .write();

    res.redirect('/product/');
}

function checkCart(sessionID) {
    var cart = db.get('sessions').find({ id: sessionID }).get('cart').value();
    var sumProduct = 0;

    for (var productID in cart) {
        sumProduct += cart[productID];
    }

    return sumProduct;
}

module.exports = {
    addToCart,
    checkCart
};