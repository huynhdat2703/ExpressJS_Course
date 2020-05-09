/**
 * Config User Route
 */
const express = require('express');
const router = express.Router();

/**
 * Import module DB
 */
const db = require('../util/db');

/**
 * Import module ShortID
 */
const ShortID = require('shortid');

/**
 * List User Page
 */
router.get('/', (req, res) => {
    var users = db.get('users').value();
    res.render('user/index', {
        listUser: users
    });
});

/**
 * Search User Page
 */
router.get('/search', (req, res) => {
    var searchKey = req.query.s;
    var filterUsers = db.get('users').value().filter((user) => {
        return user.name.toLowerCase().includes(searchKey.toLowerCase());
    });
    res.render('user/index', {
        listUser: filterUsers,
        searchKey: searchKey
    });
});

/**
 * Get Detail User Page
 */
router.get('/detail/:id', (req, res) => {
    var userID = req.params.id;
    var user = db.get('users').find({ id: userID }).value();
    res.render('user/detail', { user: user });
});

/**
 * Add User Page - GET
 */
router.get('/add', (req, res) => {
    res.render('user/add');
});

/**
 * Add User Page - POST
 */
router.post('/add', (req, res) => {
    db.get('users').push({
        id: ShortID.generate(),
        name: req.body.newName,
        email: req.body.newEmail,
        phone: req.body.newPhone
    }).write();
    res.redirect('/user/');
});

module.exports = router;