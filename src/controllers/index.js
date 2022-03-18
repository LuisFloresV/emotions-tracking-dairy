const router = require('express-promise-router')();
const { apiUrl } = require('../util/env');

router.use(`${apiUrl}/`, require('./entries'));
router.use(`${apiUrl}/`, require('./emotions'));

module.exports = router;
