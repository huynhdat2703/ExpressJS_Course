const express = require('express');
const router = express.Router();

var multer = require('multer');
var upload = multer({ dest: 'public/upload/' });

const productController = require('../controllers/product.controller');
const productMiddleware = require('../middlewares/product.middleware');

router.get('/', productController.showProducts);

router.get('/add', productController.getAddProduct);

router.post('/add',
    upload.single('productImage'),
    productMiddleware.validateAddProduct,
    productController.postAddProduct
);

module.exports = router;