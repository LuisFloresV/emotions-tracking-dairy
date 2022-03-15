const port = process.env.NODE_PORT || 3000;
const apiUrl = process.env.NODE_URL_PREFIX || '/api/v1';

module.exports.port = port;
module.exports.apiUrl = apiUrl;
