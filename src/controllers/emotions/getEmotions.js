const HTTP_STATUS = require('http-status');
const emotionsService = require('../../services/emotionsService');
const AppError = require('../../util/appError');

module.exports = async (req, res) => {
  const results = await emotionsService.searchEmotions(req.query);
  if (!results) {
    throw new AppError("There's no entries for the specified query", HTTP_STATUS.NOT_FOUND);
  }

  res.status(HTTP_STATUS.OK).json(results);
};
