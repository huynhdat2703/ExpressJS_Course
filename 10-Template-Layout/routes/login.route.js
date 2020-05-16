const express = require('express');
const router = express.Router();

const loginMiddleware = require('../middlewares/login.middleware');

router.post('/', loginMiddleware.checkLogin);

module.exports = router;