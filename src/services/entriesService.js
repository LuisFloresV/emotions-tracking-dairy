const entriesRepository = require('../db/repositories/entryRepository');

const searchEntries = async (params) => {
  const entries = await entriesRepository.find(params);
  return entries;
};

module.exports = {
  searchEntries,
};
