const router = require('express-promise-router')();

router.get('/emotions', require('./getEmotions'));
router.post('/emotions', require('./createEmotion'));

module.exports = router;
