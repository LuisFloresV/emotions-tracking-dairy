const HTTP_STATUS = require('http-status');
const entriesRepository = require('../db/repositories/entryRepository');
const emotionsRepository = require('../db/repositories/emotionRepository');
const AppError = require('../util/appError');

const searchEntries = async (params) => {
  const entries = await entriesRepository.find(params);
  return entries;
};

const buildEntry = (requestEntry, emotion) => ({ ...requestEntry, emotion });

const validateEmotion = async (requestEntry) => {
  if (!requestEntry.emotion) {
    throw new AppError('Emotion is a required field', HTTP_STATUS.BAD_REQUEST);
  }
  const emotion = await emotionsRepository.findOneById(requestEntry.emotion.id);
  if (!emotion) {
    throw new AppError('Unable to map emotion!', HTTP_STATUS.BAD_REQUEST);
  }
  return emotion;
};

const createEntry = async ({ requestEntry }) => {
  const emotion = await validateEmotion(requestEntry);
  return entriesRepository.save(buildEntry(requestEntry, emotion));
};

module.exports = {
  searchEntries,
  createEntry,
};
