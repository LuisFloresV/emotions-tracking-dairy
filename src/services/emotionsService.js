const emotionsRepository = require('../db/repositories/emotionRepository');

const searchEmotions = async (params) => {
  const entries = await emotionsRepository.find(params);
  return entries;
};

module.exports = {
  searchEmotions,
};
