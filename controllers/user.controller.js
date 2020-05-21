/**
 * Import module MD5
 */
const md5 = require('md5');

/**
 * Import module ShortID
 */
const ShortID = require('shortid');

/**
 * Import module DB
 */
const db = require('../util/db');

const cartController = require('./cart.controller');

function userIndex(req, res) {
    var users = db.get('users').value();

    var session = req.signedCookies.sessionID;
    var productsInCart = cartController.checkCart(session);

    res.render('user/index', {
        listUser: users,
        productsInCart: productsInCart
    });
}

function searchUser(req, res) {
    var searchKey = req.query.s;
    var filterUsers = db.get('users').value().filter((user) => {
        return user.name.toLowerCase().includes(searchKey.toLowerCase());
    });

    res.render('user/index', {
        listUser: filterUsers,
        searchKey: searchKey
    });
}

function findUser(req, res) {
    var userID = req.params.id;
    var user = db.get('users').find({ id: userID }).value();
    res.render('user/detail', { user: user });
}

function getAddUser(req, res) {
    res.render('user/add');
}

function postAddUser(req, res) {
    db.get('users').push({
        id: ShortID.generate(),
        name: req.body.newName,
        password: md5(req.body.newPassword),
        email: req.body.newEmail,
        phone: req.body.newPhone
    }).write();

    res.redirect('/user/');
}

function deteleUser(req, res) {
    var userID = req.params.id;
    db.get('users').remove({ id: userID }).write();
    res.redirect('/user/');
}

module.exports = {
    userIndex,
    searchUser,
    findUser,
    getAddUser,
    postAddUser,
    deteleUser
}