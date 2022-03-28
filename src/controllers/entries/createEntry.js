const HTTP_STATUS = require('http-status');
const entriesService = require('../../services/entriesService');

module.exports = async (req, res) => {
  const entry = await entriesService.createEntry({ requestEntry: req.body });
  res.status(HTTP_STATUS.CREATED).json(entry);
};
