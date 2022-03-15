const Emotion = require('../models/emotion');

const find = async () => {
  const query = Emotion.query();
  return query;
};

module.exports = {
  find,
};
