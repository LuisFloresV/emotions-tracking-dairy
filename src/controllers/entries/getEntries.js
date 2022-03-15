const entriesService = require('../../services/entriesService');

module.exports = async (req, res) => {
  const results = await entriesService.searchEntries(req.query);
  res.json(results);
};
