//Config Express Server
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

//Config Pug Engine
app.set('view engine', 'pug');
app.set('views', './views');

//Config Body Parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Start server
app.listen(port, () => {
    console.log("Server is running on port", port);

});

//Config User Data
var users = [
    { id: 1, name: "Dat", email: "dat@abc.com" },
    { id: 2, name: "An", email: "an@abc.com" },
    { id: 3, name: "Tai", email: "tai@abc.com" },
    { id: 4, name: "Cuong", email: "cuong@abc.com" },
    { id: 5, name: "Thuy", email: "thuy@abc.com" }
];

//Index page
app.get('/', (req, res) => {
    res.render('index', {
        title: "Welcome to 04-Post-Method"
    });
});

//Login Page
app.post('/login', (req, res) => {
    var loginUser = req.body;
    if (loginUser.username === 'admin' && loginUser.password === '123') {
        res.redirect('/users');
    }
    else {
        res.render('index', {
            errorMessage: 'Username or Password is wrong!',
            title: "Welcome to 04-Post-Method"
        });
    }
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
    res.render('users', { listUser: matchedUser, searchKey: search });
});