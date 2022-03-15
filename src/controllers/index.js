const express = require('express');

const router = express.Router();
const { apiUrl } = require('../util/env');

router.use(`${apiUrl}/`, require('./entries'));
router.use(`${apiUrl}/`, require('./emotions'));

module.exports = router;
