var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  return res.json({ message: 'List of users' });
});

module.exports = router;
