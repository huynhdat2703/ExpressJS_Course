//Config Express Server
const express = require('express');
const app = express();
const port = 8080;

//Config Pug Engine
app.set('view engine', 'pug');
app.set('views', './views');

//Start server
app.listen(port);

var users = [
    {id: 1, name: "Dat", email: "dat@abc.com"},
    {id: 2, name: "An", email: "an@abc.com"},
    {id: 3, name: "Tai", email: "tai@abc.com"},
    {id: 4, name: "Cuong", email: "cuong@abc.com"},
];

//Index page
app.get('/', (req, res) => {
    res.render('index', {
        title: "Welcome to 03-Query-Parameters"
    });
});

//Users page
app.get('/users', (req, res) => {
    res.render('users', {
        listUser: users
    });
});

//Search request
app.get('/search', (req, res) => {
    var search = req.query.s;
    var matchedUser = users.filter((user) => {
        return user.name.toLowerCase().includes(search.toLowerCase());
    });
    res.render('users', {listUser: matchedUser, searchKey: search});
});