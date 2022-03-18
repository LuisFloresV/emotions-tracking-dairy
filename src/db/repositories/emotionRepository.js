const Emotion = require('../models/emotion');
const { addUuid } = require('../../util/index');

const find = async () => {
  const query = Emotion.query();
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
