const { v4: uuidv4 } = require('uuid');
const { commonAllowedParams } = require('../constants');

const addUuid = (obj) => ({ id: uuidv4(), ...obj });

const removeNoAllowedParams = (params, allowedParams) => {
  Object.keys(params).forEach((param) => {
    if (!allowedParams.includes(param) && !commonAllowedParams.includes(param)) {
      // eslint-disable-next-line no-param-reassign
      delete params[param];
    }
  });
};

const buildQueryParams = (params, query) => {
  Object.keys(params).forEach((param) => {
    if (param === 'limit') {
      query.limit(params[param]);
    } else if (param === 'offset') {
      query.offset(params[param]);
    } else if (param !== 'expand') {
      query.where(param, '=', params[param]);
    }
  });
};

module.exports = {
  addUuid,
  removeNoAllowedParams,
  buildQueryParams,
};
