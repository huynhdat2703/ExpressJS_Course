/**
 * Import module DB
 */
const db = require('../util/db');

/**
 * Import module ShortID
 */
const ShortID = require('shortid');

function userIndex(req, res) {
    var users = db.get('users').value();
    res.render('user/index', {
        listUser: users
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
    var errors = [];

    if (req.body.newName === "") {
        errors.push("Name is required.");
    }

    if (req.body.newEmail === "") {
        errors.push("Email is required.");
    }

    if (req.body.newPhone === "") {
        errors.push("Phone is required.");
    }

    if (errors.length >= 1) {
        res.render('user/add', {
            errors: errors,
            data: req.body
        });
    }

    else {
        db.get('users').push({
            id: ShortID.generate(),
            name: req.body.newName,
            email: req.body.newEmail,
            phone: req.body.newPhone
        }).write();
        res.redirect('/user/');
    }
}

module.exports = {
    userIndex,
    searchUser,
    findUser,
    getAddUser,
    postAddUser
}