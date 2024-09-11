const express = require('express');
const morgan = require('morgan');

const router = require('./router/router');

const app = express();
const publicPath = __dirname.replace('app', 'public');

app.set('port', process.env.PORT || 3000);
app.set('views', `${publicPath}/templates`);
app.set('view engine', 'pug');

app.use(express.static(publicPath));
app.use(morgan('dev'));
app.use('/', router);

module.exports = app;
