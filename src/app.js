const bodyParser = require('body-parser');
const compression = require('compression');
const express = require('express');
const { default: helmet } = require('helmet');
const morgan = require('morgan');
const localPathConfig = require('./configs/local_dir');

const app = express();

// init middlewares
app.use(morgan('dev'));
app.use(helmet());
app.use(compression());

app.use(bodyParser.json())

// init db
require('./dbs/init.mongodb');

// init routes
app.use('/api', require('./routes'));
app.use('/static', express.static(localPathConfig.album))
// handle error
module.exports = app;