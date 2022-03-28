const { knexSnakeCaseMappers } = require('objection');

const common = {
  client: 'pg',
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    directory: './migrations',
  },
  seeds: { directory: './seeds' },
  ...knexSnakeCaseMappers(),
};

module.exports = {
  development: {
    ...common,
    connection: {
      port: '5442',
      database: 'dairy-db',
      user: 'user',
      password: 'password',
    },
  },
  test: {
    ...common,
    connection: {
      port: '5441',
      database: 'dairy-db-test',
      user: 'user',
      password: 'password',
    },
  },
};
