const db = require('../util/db');
const ShortID = require('shortid');

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

function getAddProduct(req, res) {
    res.render('product/add');
}

function postAddProduct(req, res) {
    var filePath = '/upload/' + req.file.filename;

    db.get('products').unshift({
        id: ShortID.generate(),
        name: req.body.productName,
        description: req.body.productDesc,
        price: req.body.productPrice,
        image: filePath
    }).write();

    res.redirect('/product/');
}

module.exports = {
    showProducts,
    getAddProduct,
    postAddProduct
};