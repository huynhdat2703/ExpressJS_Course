/**
 * Config User Route
 */
const express = require('express');
const router = express.Router();

/**
 * Import User Controller
 */
const userController = require('../controllers/user.controller');

/**
 * List User Page
 */
router.get('/', userController.userIndex);

/**
 * Search User Page
 */
router.get('/search', userController.searchUser);

/**
 * Get Detail User Page
 */
router.get('/detail/:id', userController.findUser);

/**
 * Add User Page - GET
 */
router.get('/add', userController.getAddUser);

/**
 * Add User Page - POST
 */
router.post('/add', userController.postAddUser);

module.exports = router;