const app = require('./app/index');

const port = app.get('port');

app.listen(port, () => {
  console.log(`Listening port: ${port}`);
});
