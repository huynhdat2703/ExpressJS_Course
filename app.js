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
 * Set static folder
 */
app.use(express.static('public'));

/**
 * Import Middleware
 */
const cookieMiddleware = require('./middlewares/cookie.middleware');
const sessionMiddleware = require('./middlewares/session.middleware');

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

/**
 * Import Product Route
 */
const productRoute = require('./routes/product.route');
app.use('/product', sessionMiddleware.checkSession, productRoute);

/**
 * Import Cart Route
 */
const cartRoute = require('./routes/cart.route');
app.use('/cart', cartRoute);

/**
 * Import Logout Route
 */
const logoutRoute = require('./routes/logout.route');
app.use('/logout', logoutRoute);