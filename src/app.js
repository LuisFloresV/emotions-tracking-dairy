const express = require('express');

const app = express();
const { port } = require('./util/env');
const router = require('./controllers');
const errorHandler = require('./middlewares/error');

app.use(express.json({ limit: '100kb' }));
app.use(router);

app.use(errorHandler);

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`App started on port ${port}`);
});
