const express = require('express');
const app = express();
const port = 8080;

app.listen(port, () => {
    console.log('Server is running on port:', port);
});

app.get('/', (request, response) => {
    response.send("Hello ExpressJS");
});

app.get('/users', (request, response) => {
    response.send("This is list user!");
});