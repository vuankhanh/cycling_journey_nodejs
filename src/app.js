require('dotenv').config();
const bodyParser = require('body-parser');
const compression = require('compression');
const express = require('express');
const { default: helmet } = require('helmet');
const morgan = require('morgan');
const localPathConfig = require('./configs/local_dir');

const app = express();

app.use(morgan(process.env.NODE_ENV === 'pro' ? 'tiny' : 'dev'));
app.use(helmet({
    crossOriginEmbedderPolicy: false,
}));
app.use(compression());

app.use(bodyParser.json());

// init db
require('./dbs/init.mongodb');

// init routes
app.use('/api', require('./routes'));
app.use('/static', express.static(localPathConfig.album))

// handle error
app.use((req, res, next) => {
    const error = new Error(`Can't find ${req.originalUrl} on the server`);
    error.status = 'fail';
    error.status = 404;

    next(error);
})

app.use((error, req, res, next) => {

    console.log(error);
    const status = error.status || 'error';
    const statusCode = error.status || 500;
    return res.status(statusCode).json({
        status: status,
        message: error.message || 'Interal Server Error'
    })
})


module.exports = app;