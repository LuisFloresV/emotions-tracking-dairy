let env = process.env.APP_ENV;

if (env === undefined) {
  env = 'development';
}

const knexfile = require('./knexfile')[env];
// eslint-disable-next-line import/order
const db = require('knex')(knexfile);

module.exports = db;
