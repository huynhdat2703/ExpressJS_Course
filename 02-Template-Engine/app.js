//Config Express Server
const express = require('express');
const app = express();
const port = 8080;

//Set template engine for app (Using Pug)
app.set('view engine', 'pug');

//Set location of views folder 
app.set('views', './views');

//run server
app.listen(port, () => {
    console.log("Server is running on port", port);
});

//Index page
app.get('/', (req, res) => {
    res.render('index', {title: "Welcome to Example 2: Template Engine"});
});

//Users page
app.get('/users', (req, res) => {
    var users = [
        {id: 1, name: "Dat", email: "dat@abc.com"},
        {id: 2, name: "An", email: "an@abc.com"},
        {id: 3, name: "Tai", email: "tai@abc.com"},
        {id: 4, name: "Cuong", email: "cuong@abc.com"},
    ];
    res.render('users', {users: users});
});