/**
 * Config Express Server
 */
const express = require('express');
const app = express();
const port = 3000;

/**
 * Config Template Engine
 */
app.set('view engine', 'pug');
app.set('views', './views');

/**
 * Import body-parser Module
 */
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/**
 * Import User Route
 */
const userRoute = require('./routes/user.route');
app.use('/user', userRoute);

/**
 * Start Server
 */
app.listen(port, () => {
    console.log("Server is running on port", port);
});

/**
 * Index Page
 */
app.get('/', (req, res) => {
    res.render('index', {
        title: "08-Express-Router"
    });
});

/**
 * Login Page
 */
app.post('/login', (req, res) => {
    var loginUser = req.body;

    if (loginUser.username === "admin" && loginUser.password === "123") {
        res.redirect('/user/');
    }

    else {
        res.render('index', {
            title: "08-Express-Router",
            errorMessage: "Username or Password is wrong!"
        });
    }
});
