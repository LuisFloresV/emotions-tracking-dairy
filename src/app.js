const express = require('express');

const app = express();
const { port } = require('./util/env');
const router = require('./controllers');

app.use(router);

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`App started on port ${port}`);
});
