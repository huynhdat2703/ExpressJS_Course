/**
 * Config Express Server
 */
const express = require('express');
const app = express();
const port = 3000;

/**
 * Import Module body-parser
 */
const bodyParser = require('body-parser');

/**
 * Config body-parser module
 */
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/**
 * Using pug engine
 */
app.set('view engine', 'pug');
app.set('views', './views');

/**
 * Import module Lowdb
 */
const lowBD = require('lowdb');
const fileSync = require('lowdb/adapters/FileSync');
const adapter = new fileSync('db.json');
const db = lowBD(adapter);
db.defaults({ users: [] }).write();
var users = db.get('users').value();

/**
 * Run Express Server
 */
app.listen(port, () => {
    console.log("Server is running on port", port);
});

/**
 * Index Page
 */
app.get('/', (req, res) => {
    res.render('index', { title: "06-Using-Lowdb" });
});

/**
 * Login Page
 */
app.post('/login', (req, res) => {
    var loginUser = req.body;
    if (loginUser.username === "admin" && loginUser.password === "123") {
        res.redirect('users');
    }
    else {
        res.render('index', {
            title: "06-Using-Lowdb",
            errorMessage: "Username or Password is wrong!"
        });
    }
});

/**
 * Users Page
 */

app.get('/users', (req, res) => {
    res.render('users', {
        listUser: users
    });
});

/**
 * Search Page
 */

app.get('/search', (req, res) => {
    var searchString = req.query.s;
    var filteredUsers = users.filter((user) => {
        return user.name.toLowerCase().includes(searchString.toLowerCase());
    });
    res.render('users', {
        listUser: filteredUsers,
        searchKey: searchString
    });
});

/**
 * Add New User Page - GET
 */

app.get('/add-user', (req, res) => {
    res.render('add-user');
});

/**
 * Add New User Page - POST
 */

app.post('/add-user', (req, res) => {
    db.get('users').push({
        name: req.body.newName,
        email: req.body.newEmail
    }).write();
    res.redirect('users');
});