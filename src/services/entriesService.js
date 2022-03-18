const HTTP_STATUS = require('http-status');
const entriesRepository = require('../db/repositories/entryRepository');
const emotionsRepository = require('../db/repositories/emotionRepository');
const AppError = require('../util/appError');

const searchEntries = async (params) => {
  const entries = await entriesRepository.find(params);
  return entries;
};

const buildEntry = (requestEntry, emotion) => ({ ...requestEntry, emotion });

const createEntry = async ({ requestEntry }) => {
  const emotion = await emotionsRepository.findOneById(requestEntry.emotion.id);
  if (!emotion) {
    throw new AppError('Unable to map emotion!', HTTP_STATUS.NOT_FOUND);
  }

  return entriesRepository.save(buildEntry(requestEntry, emotion));
};

module.exports = {
  searchEntries,
  createEntry,
};
