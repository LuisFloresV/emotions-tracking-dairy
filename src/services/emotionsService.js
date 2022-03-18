const HTTP_STATUS = require('http-status');
const emotionsRepository = require('../db/repositories/emotionRepository');
const AppError = require('../util/appError');

const searchEmotions = async (params) => {
  const entries = await emotionsRepository.find(params);
  return entries;
};

const createEmotion = async ({ requestEmotion }) => {
  const emotion = await emotionsRepository.findOne(requestEmotion);

  if (emotion.length >= 1) {
    throw new AppError('Emotion already exists', HTTP_STATUS.BAD_REQUEST);
  }

  return emotionsRepository.save(requestEmotion);
};

module.exports = {
  searchEmotions,
  createEmotion,
};
