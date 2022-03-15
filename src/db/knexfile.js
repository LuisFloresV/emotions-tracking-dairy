module.exports = {

  development: {
    client: 'pg',
    connection: {
      port: '5442',
      database: 'dairy-db',
      user: 'user',
      password: 'password',
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: './migrations',
    },
    seeds: { directory: './seeds' },
  },
};
