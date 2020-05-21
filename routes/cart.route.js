const express = require('express');
const router = express.Router();

const cartController = require('../controllers/cart.controller');

router.get('/', (req, res) => {
    res.send("Your Cart");
});

router.get('/add/:productID', cartController.addToCart);

module.exports = router;