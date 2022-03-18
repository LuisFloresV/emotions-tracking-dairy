const router = require('express-promise-router')();

router.get('/entries', require('./getEntries'));
router.post('/entries', require('./createEntry'));

module.exports = router;
