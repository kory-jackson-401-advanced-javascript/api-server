'use strict';

const express = require('express');
const logger = require('./middleware/logger');


const notFoundError = require('./middleware/404.js');
const errorHandler = require('./middleware/500.js');

const routesV1 = require('./routes/api-v1.js');


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(logger);

app.use('/api/v1', routesV1);
app.use('*', notFoundError);
app.use(errorHandler);


// app.get('/', (req, res) => {
//     console.log('I am the home page');
// });



const serverStart = (port) => {
    app.listen(port, () => {
        console.log('Server up and running on port', port);
    })
}

module.exports = {
    server: app,
    start: serverStart,
}
