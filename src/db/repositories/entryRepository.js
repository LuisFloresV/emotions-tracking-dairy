const Entry = require('../models/entry');
const { addUuid } = require('../../util');
const { entriesAllowedParams } = require('../../constants/index');
const { buildQueryParams, removeNoAllowedParams } = require('../../util');

const eagerFetchLoading = (params, query) => {
  const { expand } = params;
  if (expand === 'emotion' || expand === '*') {
    query.withGraphFetched('emotion');
  }
};

const find = async (params) => {
  const query = Entry.query();
  removeNoAllowedParams(params, entriesAllowedParams);
  buildQueryParams(params, query);
  eagerFetchLoading(params, query);
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
