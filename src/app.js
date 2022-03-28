const express = require('express');
const { port } = require('./util/env');

const app = express();
const router = require('./controllers');
const errorHandler = require('./middlewares/error');

app.use(express.json({ limit: '100kb' }));
app.use(router);

app.use(errorHandler);

app.listen(port);

module.exports = app;
