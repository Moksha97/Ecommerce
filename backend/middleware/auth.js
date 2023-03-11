var express = require('express');
var router = express.Router();

// Verify JWT Token
router.use(function (req, res, next) {
    if(!req.userId) return res.status(401).send({ auth: false, message: 'No token provided or Invalid token.' });
});

module.exports = router;