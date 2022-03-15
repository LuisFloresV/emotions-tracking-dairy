const emotionsService = require('../../services/emotionsService');

module.exports = async (req, res) => {
  const results = await emotionsService.searchEmotions(req.query);
  res.json(results);
};
