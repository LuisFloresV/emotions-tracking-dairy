const HTTP_STATUS = require('http-status');
const emotionsService = require('../../services/emotionsService');

module.exports = async (req, res) => {
  const entry = await emotionsService.createEmotion({ requestEmotion: req.body });
  res.status(HTTP_STATUS.OK).json(entry);
};
