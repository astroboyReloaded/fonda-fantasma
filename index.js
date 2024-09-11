const express = require('express');
const morgan = require('morgan');
const path = require('path');

const app = express();
const router = require('./src/app/router');
const publicPath = path.join(__dirname, 'src', 'public');

const port = process.env.PORT || 3000;
app.set('views', `${publicPath}/templates`);
app.set('view engine', 'pug');

app.use(express.static(publicPath));
app.use(morgan('dev'));
app.use('/', router);

app.listen(port, () => {
  console.log(`Listening port: ${port}`);
});
