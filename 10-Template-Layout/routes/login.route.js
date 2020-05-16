/**
 * Import Express & Router
 */
const express = require('express');
const router = express.Router();

/**
 * Import Login Middleware
 */
const loginController = require('../controllers/login.controller');

/**
 * Login Page
 */
router.post('/', loginController.checkLogin);

module.exports = router;