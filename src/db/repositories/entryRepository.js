const Entry = require('../models/entry');

const find = async (params) => {
  const query = Entry.query();
  if (params.expand === '*') {
    query.withGraphFetched('emotions');
  }
  return query;
};

module.exports = {
  find,
};
