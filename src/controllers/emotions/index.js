const express = require('express');

const router = express.Router();

router.get('/emotions', require('./getEmotions'));

module.exports = router;
