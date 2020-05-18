const db = require('../util/db');

function showProducts(req, res) {
    var products = db.get('products').value();
    var productPerPage = 8;

    var page = req.query.page ? parseInt(req.query.page) : 1;
    var totalPage = Math.floor(products.length / productPerPage) + 1;

    if (page > totalPage) {
        page = totalPage;
    }

    if (page < 1) {
        page = 1;
    }

    var listProductByPage = products.slice((page - 1) * productPerPage, (page * productPerPage));

    res.render('product/index', {
        listProduct: listProductByPage,
        totalPage: totalPage,
        selectedPage: page
    });
}

module.exports = {
    showProducts
};