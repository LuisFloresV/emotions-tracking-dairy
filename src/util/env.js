const port = process.env.NODE_PORT || 3000;
const apiUrl = process.env.NODE_URL_PREFIX || '/api/v1';
const nodeEnv = process.env.NODE_ENV || 'development';

module.exports.nodeEnv = nodeEnv;
module.exports.port = port;
module.exports.apiUrl = apiUrl;
