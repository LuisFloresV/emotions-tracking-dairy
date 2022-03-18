const Emotion = require('../models/emotion');
const { addUuid } = require('../../util/index');
const { emotionsAllowedParams } = require('../../constants/index');
const { buildQueryParams, removeNoAllowedParams } = require('../../util');

const find = async (params) => {
  const query = Emotion.query();
  removeNoAllowedParams(params, emotionsAllowedParams);
  buildQueryParams(params, query);
  return query;
};

const findOne = async (emotion) => {
  const query = Emotion.query();
  if (emotion.name) {
    query.where('name', '=', emotion.name);
  }
  return query;
};

const findOneById = async (id) => {
  const query = Emotion.query().findById(id);
  return query;
};

const save = async (emotion) => {
  const query = Emotion.query().insertGraph(addUuid(emotion));
  return query;
};

module.exports = {
  find,
  findOneById,
  findOne,
  save,
};
