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
 * Import cookie-parser Module
 */
const cookieParser = require('cookie-parser');
app.use(cookieParser('secret'));

/**
 * Import Login Middleware
 */
const cookieMiddleware = require('./middlewares/cookie.middleware');

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
    res.render('index');
});

/**
 * Import Login Route
 */
const loginRoute = require('./routes/login.route');
app.use('/login', loginRoute);

/**
 * Import User Route
 */
const userRoute = require('./routes/user.route');
app.use('/user', cookieMiddleware.checkCookie, userRoute);

