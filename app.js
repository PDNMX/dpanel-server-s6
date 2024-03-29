var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var dpanelRouter = require('./routes/dpanel');
var apiRouter = require('./routes/api');

var app = express();

/**
 * TODO:
 * Agregar sesión de usuario
 *
 */

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/dpanel', dpanelRouter);
app.use('/api', apiRouter);

module.exports = app;
