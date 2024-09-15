const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const morgan = require('morgan');
const path = require('path');

const app = express();
const router = require('./src/app/router');
const publicPath = path.join(__dirname, 'src', 'public');

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Failed to connect to MongoDB', err));

const port = process.env.PORT || 3000;
app.set('views', `${publicPath}/templates`);
app.set('view engine', 'pug');

app.use(express.static(publicPath));
app.use(express.json());
app.use(morgan('dev'));
app.use('/', router);

app.listen(port, () => {
  console.log(`Listening port: ${port}`);
});
