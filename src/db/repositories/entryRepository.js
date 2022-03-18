const Entry = require('../models/entry');
const { addUuid } = require('../../util');

const find = async (params) => {
  const query = Entry.query();
  if (params.expand === '*') {
    query.withGraphFetched('emotion');
  }
  return query;
};

const save = async (entry) => {
  const query = Entry.query().insertGraph(addUuid(entry), { relate: ['emotion'] });
  return query;
};

module.exports = {
  find,
  save,
};
