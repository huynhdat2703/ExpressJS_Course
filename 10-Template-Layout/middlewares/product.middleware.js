

function validateAddProduct(req, res, next) {
    var errors = [];
    if (!req.body.productName) {
        errors.push('Product Name is required.');
    }

    if (!req.body.productDesc) {
        errors.push('Description is required.');
    }

    if (!req.body.productPrice) {
        errors.push('Price is required.');
    }

    if (!req.file) {
        errors.push('Please choose Image.');
    }

    if (errors.length >= 1) {
        res.render('product/add', {
            errors: errors
        });
        return;
    }
    next();
}

module.exports = {
    validateAddProduct
};