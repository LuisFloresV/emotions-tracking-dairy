const express = require('express');

const router = express.Router();

router.get('/entries', require('./getEntries'));

module.exports = router;
